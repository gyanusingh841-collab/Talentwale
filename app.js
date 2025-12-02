// Configuration
const CONFIG = {
  // Project ID from your JSON
  projectId: 'talentwale-issues',
  
  // YOUR NEW API KEY
  apiKey: 'AIzaSyA5X1MEweP0WvQbJ2uqG1NQON_fFyPm-lY',
  
  sheetId: '1rZJ7Tu-huQi_EVVSjjy7uhUumaxbM08WwsKjtjYJCn0',
  sheetName: 'Website Issues',
  apiEndpoint: 'https://sheets.googleapis.com/v4/spreadsheets',
  refreshInterval: 30000,
  maxRetries: 3,
  pageSize: 20
};

// Global state
let state = {
  allData: [],
  filteredData: [],
  displayData: [],
  headers: [],
  columnMapping: {},
  sortColumn: null,
  sortDirection: 'asc',
  currentPage: 1,
  pageSize: 20,
  autoRefreshInterval: null,
  charts: {
    status: null,
    priority: null
  }
};

// Column mapping helper
function findColumn(headers, possibleNames) {
  const lowerHeaders = headers.map(h => h.toLowerCase());
  for (const name of possibleNames) {
    const index = lowerHeaders.indexOf(name.toLowerCase());
    if (index !== -1) return headers[index];
  }
  return null;
}

// Map columns from sheet
function mapColumns(headers) {
  return {
    issueNumber: findColumn(headers, ['id', 'issue id', 'issue number']) || 'ID',
    title: findColumn(headers, ['title', 'subject', 'name']) || 'Title',
    description: findColumn(headers, ['description', 'detail', 'details', 'summary']) || 'Description',
    status: findColumn(headers, ['status', 'state', 'condition']) || 'Status',
    devComment: findColumn(headers, ['dev comment', 'developer comment', 'dev notes', 'dev feedback']) || 'Dev Comment',
    qaComment: findColumn(headers, ['qa comment', 'qa notes', 'testing comments', 'qa feedback']) || 'QA Comment',
    overallStatus: findColumn(headers, ['overall status', 'final status', 'resolution', 'outcome']) || 'Overall Status',
    priority: findColumn(headers, ['priority', 'severity', 'level']) || 'Priority',
    category: findColumn(headers, ['category', 'type', 'module']) || 'Category',
    dateCreated: findColumn(headers, ['date created', 'date', 'created date', 'created on']) || 'Date Created',
    assignedTo: findColumn(headers, ['assigned to', 'assignee', 'owner', 'developer']) || 'Assigned To'
  };
}

// Normalize status values
function normalizeStatus(status) {
  if (!status) return 'Other';
  const lower = status.toLowerCase().trim();
  
  const doneValues = ['done', 'resolved', 'closed', 'completed', 'finished'];
  const pendingValues = ['pending', 'open', 'in progress', 'in-progress', 'todo', 'to-do'];
  
  if (doneValues.some(v => lower.includes(v))) return 'Done';
  if (pendingValues.some(v => lower.includes(v))) return 'Pending';
  return 'Other';
}

// Fetch data from Google Sheets
async function fetchSheetData(retryCount = 0) {
  try {
    showLoading(true);
    updateConnectionStatus('connecting');

    const url = `${CONFIG.apiEndpoint}/${CONFIG.sheetId}/values/${encodeURIComponent(CONFIG.sheetName)}?key=${CONFIG.apiKey}`;
    console.log('Fetching data from Google Sheets...');
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', response.status, errorText);
      
      let errorMessage = `API request failed: ${response.status}`;
      if (response.status === 403) {
        errorMessage = 'Access denied. Please check if the Google Sheet is shared as "Anyone with the link can view".';
      } else if (response.status === 404) {
        errorMessage = 'Sheet not found. Please verify the Sheet ID and Sheet Name.';
      } else if (response.status === 400) {
        errorMessage = 'Invalid request. Please check the Sheet Name for special characters.';
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('Data received:', data);
    
    if (!data.values || data.values.length === 0) {
      throw new Error('No data found in the sheet');
    }

    // Parse data
    state.headers = data.values[0];
    state.columnMapping = mapColumns(state.headers);
    
    state.allData = data.values.slice(1).map((row, index) => {
      const rowData = { _rowIndex: index };
      state.headers.forEach((header, i) => {
        rowData[header] = row[i] || '';
      });
      return rowData;
    });

    state.filteredData = [...state.allData];
    state.currentPage = 1;
    
    updateUI();
    updateConnectionStatus('connected');
    updateLastUpdated();
    hideError();
    
  } catch (error) {
    console.error('Error fetching data:', error);
    updateConnectionStatus('error');
    
    if (retryCount < CONFIG.maxRetries) {
      console.log(`Retrying... (Attempt ${retryCount + 1}/${CONFIG.maxRetries})`);
      setTimeout(() => fetchSheetData(retryCount + 1), 2000 * (retryCount + 1));
    } else {
      const errorMsg = `Failed to load data: ${error.message}\n\nCheck: Is the Google Sheet set to 'Anyone with the link'?`;
      showError(errorMsg);
    }
  } finally {
    showLoading(false);
  }
}

// Update all UI components
function updateUI() {
  updateStats();
  updateCharts();
  updateFilters();
  updatePagination();
  updateTable();
}

// Update statistics cards
function updateStats() {
  const total = state.allData.length;
  const statusCol = state.columnMapping.status;
  
  let pending = 0, inProgress = 0, done = 0;
  
  if (statusCol) {
    state.allData.forEach(row => {
      const normalized = normalizeStatus(row[statusCol]);
      if (normalized === 'Pending') pending++;
      else if (normalized === 'Done') done++;
      else inProgress++;
    });
  }

  const totalEl = document.getElementById('totalIssues');
  if(totalEl) totalEl.textContent = total;
  
  const openEl = document.getElementById('openIssues');
  if(openEl) openEl.textContent = pending;

  const progressEl = document.getElementById('inProgressIssues');
  if(progressEl) progressEl.textContent = inProgress;

  const resolvedEl = document.getElementById('resolvedIssues');
  if(resolvedEl) resolvedEl.textContent = done;
}

// Update charts
function updateCharts() {
  const statusCol = state.columnMapping.status;
  const priorityCol = state.columnMapping.priority;

  // Status chart - normalized
  if (statusCol) {
    const statusCounts = { 'Pending': 0, 'Done': 0, 'Other': 0 };
    state.allData.forEach(row => {
      const normalized = normalizeStatus(row[statusCol]);
      statusCounts[normalized]++;
    });
    updateStatusChart(statusCounts);
  }

  // Priority chart
  if (priorityCol) {
    const priorityCounts = {};
    state.allData.forEach(row => {
      const priority = row[priorityCol] || 'Unknown';
      priorityCounts[priority] = (priorityCounts[priority] || 0) + 1;
    });
    updatePriorityChart(priorityCounts);
  }
}

// Update status chart
function updateStatusChart(data) {
  const ctx = document.getElementById('statusChart');
  if (!ctx) return;
  
  if (state.charts.status) {
    state.charts.status.destroy();
  }

  if (typeof Chart !== 'undefined') {
      state.charts.status = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: Object.keys(data),
          datasets: [{
            data: Object.values(data),
            backgroundColor: ['#2196F3', '#FF9800', '#4CAF50', '#F44336', '#9C27B0'],
            borderWidth: 2,
            borderColor: '#fff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 15,
                font: { size: 12 }
              }
            }
          }
        }
      });
  }
}

// Update priority chart
function updatePriorityChart(data) {
  const ctx = document.getElementById('priorityChart');
  if (!ctx) return;
  
  if (state.charts.priority) {
    state.charts.priority.destroy();
  }

  if (typeof Chart !== 'undefined') {
      state.charts.priority = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(data),
          datasets: [{
            label: 'Number of Issues',
            data: Object.values(data),
            backgroundColor: ['#F44336', '#FF9800', '#4CAF50', '#2196F3', '#9C27B0'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }
          }
        }
      });
  }
}

// Update data table
function updateTable() {
  const thead = document.getElementById('tableHead');
  const tbody = document.getElementById('tableBody');
  const tableCount = document.getElementById('tableCount');
  const cm = state.columnMapping;

  if (!thead || !tbody) return;

  // Define display columns in order
  const displayColumns = [
    { key: 'issueNumber', label: 'Issue Number' },
    { key: 'title', label: 'Title' },
    { key: 'description', label: 'Description' },
    { key: 'status', label: 'Status' },
    { key: 'devComment', label: 'Dev Comment' },
    { key: 'qaComment', label: 'QA Comment' },
    { key: 'overallStatus', label: 'Overall Status' },
    { key: 'priority', label: 'Priority' },
    { key: 'category', label: 'Category' },
    { key: 'dateCreated', label: 'Date Created' },
    { key: 'assignedTo', label: 'Assigned To' }
  ];

  // Update header
  thead.innerHTML = `
    <tr>
      ${displayColumns.map((col, i) => `
        <th class="sortable" data-column="${i}" data-key="${col.key}">${col.label}</th>
      `).join('')}
    </tr>
  `;

  // Add sort listeners
  thead.querySelectorAll('th').forEach(th => {
    th.addEventListener('click', () => {
      const column = th.dataset.key;
      sortTable(column);
    });
  });

  // Calculate pagination
  const start = (state.currentPage - 1) * state.pageSize;
  const end = start + state.pageSize;
  state.displayData = state.filteredData.slice(start, end);

  // Update body
  if (state.displayData.length === 0) {
    tbody.innerHTML = `<tr><td colspan="${displayColumns.length}">No data found</td></tr>`;
  } else {
    tbody.innerHTML = state.displayData.map((row, rowIndex) => `
      <tr>
        ${displayColumns.map(col => {
          const actualCol = cm[col.key];
          let value = row[actualCol] || '';
          
          // Description - show View link
          if (col.key === 'description' && value) {
            value = `<span class="view-link" onclick="showDescription('${escapeHtml(value)}', '${escapeHtml(row[cm.issueNumber] || '')}')">View</span>`;
          }
          // Status - normalize and badge
          else if (col.key === 'status' && value) {
            const normalized = normalizeStatus(value);
            const statusClass = normalized.toLowerCase();
            value = `<span class="status-badge ${statusClass}">${normalized}</span>`;
          }
          // Overall Status - badge
          else if (col.key === 'overallStatus' && value) {
            const normalized = normalizeStatus(value);
            const statusClass = normalized.toLowerCase();
            value = `<span class="status-badge ${statusClass}">${value}</span>`;
          }
          // Priority - badge
          else if (col.key === 'priority' && value) {
            const priorityClass = value.toLowerCase();
            value = `<span class="priority-badge ${priorityClass}">${value}</span>`;
          }
          
          return `<td>${value}</td>`;
        }).join('')}
      </tr>
    `).join('');
  }

  if (tableCount) {
    tableCount.textContent = `${state.filteredData.length} issue${state.filteredData.length !== 1 ? 's' : ''}`;
  }
}

// Show description modal
function showDescription(description, issueNumber) {
  const modal = document.getElementById('descriptionModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  
  if (modalTitle) modalTitle.textContent = `Description - Issue ${issueNumber}`;
  if (modalBody) modalBody.innerHTML = `<p>${description || 'No description available'}</p>`;
  if (modal) modal.classList.add('show');
}

// Escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML.replace(/'/g, '&apos;');
}

// Update pagination controls
function updatePagination() {
  const totalPages = Math.ceil(state.filteredData.length / state.pageSize);
  const prevBtn = document.getElementById('prevPage');
  const nextBtn = document.getElementById('nextPage');
  const paginationInfo = document.getElementById('paginationInfo');
  
  if (prevBtn) prevBtn.disabled = state.currentPage === 1;
  if (nextBtn) nextBtn.disabled = state.currentPage >= totalPages || totalPages === 0;
  if (paginationInfo) paginationInfo.textContent = `Page ${state.currentPage} of ${totalPages || 1}`;
}

// Sort table
function sortTable(columnKey) {
  if (state.sortColumn === columnKey) {
    state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    state.sortColumn = columnKey;
    state.sortDirection = 'asc';
  }

  const actualCol = state.columnMapping[columnKey];
  
  state.filteredData.sort((a, b) => {
    const aVal = (a[actualCol] || '').toString().toLowerCase();
    const bVal = (b[actualCol] || '').toString().toLowerCase();
    
    if (aVal < bVal) return state.sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return state.sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  state.currentPage = 1;
  updatePagination();
  updateTable();
}

// Update filter dropdowns
function updateFilters() {
  // Status filter - show normalized values
  const statusFilter = document.getElementById('statusFilter');
  if (statusFilter) {
      statusFilter.innerHTML = `
        <option value="">All Statuses</option>
        <option value="Pending">Pending</option>
        <option value="Done">Done</option>
        <option value="Other">Other</option>
      `;
  }

  // Priority filter
  const priorityCol = state.columnMapping.priority;
  if (priorityCol) {
    const priorities = [...new Set(state.allData.map(row => row[priorityCol]).filter(Boolean))];
    const priorityFilter = document.getElementById('priorityFilter');
    if (priorityFilter) {
        priorityFilter.innerHTML = '<option value="">All Priorities</option>' +
        priorities.map(priority => `<option value="${priority}">${priority}</option>`).join('');
    }
  }
}

// Apply filters
function applyFilters() {
  const searchInput = document.getElementById('searchInput');
  const statusFilter = document.getElementById('statusFilter');
  const priorityFilter = document.getElementById('priorityFilter');
  const dateFromFilter = document.getElementById('dateFromFilter');
  const dateToFilter = document.getElementById('dateToFilter');

  const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
  const statusVal = statusFilter ? statusFilter.value : '';
  const priorityVal = priorityFilter ? priorityFilter.value : '';
  const dateFrom = dateFromFilter ? dateFromFilter.value : '';
  const dateTo = dateToFilter ? dateToFilter.value : '';

  const cm = state.columnMapping;

  state.filteredData = state.allData.filter(row => {
    // Search filter - search across multiple fields
    if (searchTerm) {
      const searchFields = [
        row[cm.issueNumber],
        row[cm.title],
        row[cm.assignedTo],
        row[cm.category],
        row[cm.devComment],
        row[cm.qaComment]
      ].filter(Boolean);
      
      const matchesSearch = searchFields.some(val => 
        val.toString().toLowerCase().includes(searchTerm)
      );
      if (!matchesSearch) return false;
    }

    // Status filter - use normalized status
    if (statusVal) {
      const normalized = normalizeStatus(row[cm.status]);
      if (normalized !== statusVal) return false;
    }

    // Priority filter
    if (priorityVal && row[cm.priority] !== priorityVal) {
      return false;
    }

    // Date range filter
    if (dateFrom || dateTo) {
      const rowDate = row[cm.dateCreated];
      if (rowDate) {
        const date = new Date(rowDate);
        if (dateFrom && date < new Date(dateFrom)) return false;
        if (dateTo && date > new Date(dateTo)) return false;
      }
    }

    return true;
  });

  state.currentPage = 1;
  updatePagination();
  updateTable();
}

// Export to CSV
function exportToCSV() {
  if (state.filteredData.length === 0) {
    alert('No data to export');
    return;
  }

  const cm = state.columnMapping;
  const headers = ['Issue Number', 'Title', 'Description', 'Status', 'Dev Comment', 'QA Comment', 'Overall Status', 'Priority', 'Category', 'Date Created', 'Assigned To'];
  const columns = [cm.issueNumber, cm.title, cm.description, cm.status, cm.devComment, cm.qaComment, cm.overallStatus, cm.priority, cm.category, cm.dateCreated, cm.assignedTo];

  // Create CSV content
  const csvRows = [];
  csvRows.push(headers.join(','));

  state.filteredData.forEach(row => {
    const values = columns.map(col => {
      const value = (row[col] || '').toString();
      // Escape quotes and wrap in quotes if contains comma
      return value.includes(',') ? `"${value.replace(/"/g, '""')}"` : value;
    });
    csvRows.push(values.join(','));
  });

  const csvContent = csvRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `module-issues-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

// UI helper functions
function showLoading(show) {
  const overlay = document.getElementById('loadingOverlay');
  if (overlay) {
      if (show) {
        overlay.classList.remove('hidden');
      } else {
        overlay.classList.add('hidden');
      }
  }
}

function showError(message) {
  const errorDiv = document.getElementById('errorMessage');
  const errorText = document.getElementById('errorText');
  if (errorText) errorText.textContent = message;
  if (errorDiv) errorDiv.style.display = 'block';
}

function hideError() {
  const errorDiv = document.getElementById('errorMessage');
  if (errorDiv) errorDiv.style.display = 'none';
}

function updateConnectionStatus(status) {
  const statusElement = document.getElementById('connectionStatus');
  if (!statusElement) return;

  const dot = statusElement.querySelector('.status-dot');
  const text = statusElement.querySelector('.status-text');

  dot.className = 'status-dot';
  
  switch(status) {
    case 'connected':
      dot.classList.add('connected');
      text.textContent = 'Connected';
      break;
    case 'error':
      dot.classList.add('error');
      text.textContent = 'Connection Error';
      break;
    default:
      text.textContent = 'Connecting...';
  }
}

function updateLastUpdated() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  });
  const lastUpdatedEl = document.getElementById('lastUpdated');
  if (lastUpdatedEl) lastUpdatedEl.textContent = `Last updated: ${timeString}`;
}

// Event listeners
function setupEventListeners() {
  // Refresh button
  const refreshBtn = document.getElementById('refreshBtn');
  if (refreshBtn) {
      refreshBtn.addEventListener('click', async () => {
        refreshBtn.classList.add('spinning');
        await fetchSheetData();
        setTimeout(() => refreshBtn.classList.remove('spinning'), 1000);
      });
  }

  // Retry button
  const retryBtn = document.getElementById('retryBtn');
  if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        fetchSheetData();
      });
  }

  // Search input
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.addEventListener('input', applyFilters);

  // Filter dropdowns
  const statusFilter = document.getElementById('statusFilter');
  if (statusFilter) statusFilter.addEventListener('change', applyFilters);
  
  const priorityFilter = document.getElementById('priorityFilter');
  if (priorityFilter) priorityFilter.addEventListener('change', applyFilters);
  
  const dateFromFilter = document.getElementById('dateFromFilter');
  if (dateFromFilter) dateFromFilter.addEventListener('change', applyFilters);
  
  const dateToFilter = document.getElementById('dateToFilter');
  if (dateToFilter) dateToFilter.addEventListener('change', applyFilters);

  // Rows per page
  const rowsPerPage = document.getElementById('rowsPerPage');
  if (rowsPerPage) {
      rowsPerPage.addEventListener('change', (e) => {
        state.pageSize = parseInt(e.target.value);
        state.currentPage = 1;
        updatePagination();
        updateTable();
      });
  }

  // Pagination buttons
  const prevPage = document.getElementById('prevPage');
  if (prevPage) {
      prevPage.addEventListener('click', () => {
        if (state.currentPage > 1) {
          state.currentPage--;
          updatePagination();
          updateTable();
        }
      });
  }

  const nextPage = document.getElementById('nextPage');
  if (nextPage) {
      nextPage.addEventListener('click', () => {
        const totalPages = Math.ceil(state.filteredData.length / state.pageSize);
        if (state.currentPage < totalPages) {
          state.currentPage++;
          updatePagination();
          updateTable();
        }
      });
  }

  // Modal close
  const modalClose = document.getElementById('modalClose');
  if (modalClose) {
      modalClose.addEventListener('click', () => {
        document.getElementById('descriptionModal').classList.remove('show');
      });
  }

  // Close modal on outside click
  const descriptionModal = document.getElementById('descriptionModal');
  if (descriptionModal) {
      descriptionModal.addEventListener('click', (e) => {
        if (e.target.id === 'descriptionModal') {
          document.getElementById('descriptionModal').classList.remove('show');
        }
      });
  }

  // Export button
  const exportBtn = document.getElementById('exportBtn');
  if (exportBtn) exportBtn.addEventListener('click', exportToCSV);
}

// Make showDescription globally accessible
window.showDescription = showDescription;

// Auto-refresh functionality
function startAutoRefresh() {
  if (state.autoRefreshInterval) {
    clearInterval(state.autoRefreshInterval);
  }

  state.autoRefreshInterval = setInterval(() => {
    console.log('Auto-refreshing data...');
    fetchSheetData();
  }, CONFIG.refreshInterval);
}

function stopAutoRefresh() {
  if (state.autoRefreshInterval) {
    clearInterval(state.autoRefreshInterval);
    state.autoRefreshInterval = null;
  }
}

// Initialize the application
async function init() {
  console.log('Initializing Website Issues Dashboard...');
  setupEventListeners();
  await fetchSheetData();
  startAutoRefresh();
  console.log('Dashboard initialized successfully');
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
