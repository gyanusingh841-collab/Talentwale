// Configuration
const CONFIG = {
  sheetId: '1rZJ7Tu-huQi_EVVSjjy7uhUumaxbM08WwsKjtjYJCn0',
  sheetName: 'Website Issues',
  apiKey: 'AIzaSyDxSx1i7pEpjwAK4-LWuoS44crY0xi9HKo',
  apiEndpoint: 'https://sheets.googleapis.com/v4/spreadsheets',
  refreshInterval: 30000,
  maxRetries: 3,
  pageSize: 20
};

const OLD_CONFIG = {
  serviceAccount: {
    type: 'service_account',
    project_id: 'gen-lang-client-0907149270',
    private_key_id: 'f0bf292f5cde3fa7ce397831bf1bed0643a4a6ad',
    private_key: `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDKPJ3qR8Y8VDn+
XqEWvE1xaJmYnfFhqwWVULfVGK3PF5cLVHqYHGIjHR3V7QRxE8aD3JhQN8W1qJoL
0tKRfqPYVHXhHqQXqJJlF3qL0qJqPqJ8VHqJqPqJqPqJqPqJqPqJqPqJqPqJqPqJ
qPqJqPqJqPqJqPqJqPqJqPqJqPqJqPqJqPqJqPqJqPqJqPqJqPqJqPqJqPqJqPqJ
qPqJqPqJqPqJqPqJqPqJqPqJqPqJqPqJqPqJqPqJqPqJqPqJqPqJqPqJqPqJqPqJ
qPqJqPqJqPqJqPqJqPqJqPqJqPqJqPqJqPqJqPqJqPqJqPqJqPqJqPqJqPqJqPqJ
qPqJqPqJAgMBAAECggEABb3Z7J8Q3qJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJ
qJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJq
JqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJ
qJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJq
JqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJ
qJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJq
JqJqJqJqJqKQKBgQD5qJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJq
JqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJ
qJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJq
JqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJwKBgQDPqJqJqJqJqJqJqJqJqJq
JqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJ
qJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJq
JqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJwKBgFqJqJq
JqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJ
qJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJq
JqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJ
qJqJqJqJqJqJqJqJqJqJAoGBAMqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJq
JqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJ
qJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJq
JqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJAoGBAKqJqJqJqJqJqJ
qJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJq
JqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJ
qJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJq
JqJqJqJqJqJqJqJqJqJqJ
-----END PRIVATE KEY-----`,
    client_email: 'talentwale@gen-lang-client-0907149270.iam.gserviceaccount.com',
    client_id: '111134748276502974395',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token'
  },
  sheetId: '1rZJ7Tu-huQi_EVVSjjy7uhUumaxbM08WwsKjtjYJCn0',
  sheetName: 'Website Issues',
  apiEndpoint: 'https://sheets.googleapis.com/v4/spreadsheets',
  scopes: 'https://www.googleapis.com/auth/spreadsheets.readonly',
  refreshInterval: 30000,
  maxRetries: 3
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
    console.log('Sheet ID:', CONFIG.sheetId);
    console.log('Sheet Name:', CONFIG.sheetName);

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
        errorMessage = 'Access denied. Please check if the sheet is publicly viewable and API key is valid.';
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
    console.log('Column mapping:', state.columnMapping);
    
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
      const errorMsg = `Failed to load data: ${error.message}\n\nTroubleshooting:\n• Ensure the Google Sheet is publicly viewable (Anyone with link can view)\n• Verify the Sheet Name is exactly "Website Issues"\n• Check that the API key is valid and has not been restricted`;
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

  document.getElementById('totalIssues').textContent = total;
  document.getElementById('openIssues').textContent = pending;
  document.getElementById('inProgressIssues').textContent = inProgress;
  document.getElementById('resolvedIssues').textContent = done;
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
  
  if (state.charts.status) {
    state.charts.status.destroy();
  }

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

// Update priority chart
function updatePriorityChart(data) {
  const ctx = document.getElementById('priorityChart');
  
  if (state.charts.priority) {
    state.charts.priority.destroy();
  }

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

// Update data table
function updateTable() {
  const thead = document.getElementById('tableHead');
  const tbody = document.getElementById('tableBody');
  const tableCount = document.getElementById('tableCount');
  const cm = state.columnMapping;

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

  tableCount.textContent = `${state.filteredData.length} issue${state.filteredData.length !== 1 ? 's' : ''}`;
}

// Show description modal
function showDescription(description, issueNumber) {
  const modal = document.getElementById('descriptionModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  
  modalTitle.textContent = `Description - Issue ${issueNumber}`;
  modalBody.innerHTML = `<p>${description || 'No description available'}</p>`;
  modal.classList.add('show');
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
  
  prevBtn.disabled = state.currentPage === 1;
  nextBtn.disabled = state.currentPage >= totalPages || totalPages === 0;
  paginationInfo.textContent = `Page ${state.currentPage} of ${totalPages || 1}`;
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
  statusFilter.innerHTML = `
    <option value="">All Statuses</option>
    <option value="Pending">Pending</option>
    <option value="Done">Done</option>
    <option value="Other">Other</option>
  `;

  // Priority filter
  const priorityCol = state.columnMapping.priority;
  if (priorityCol) {
    const priorities = [...new Set(state.allData.map(row => row[priorityCol]).filter(Boolean))];
    const priorityFilter = document.getElementById('priorityFilter');
    priorityFilter.innerHTML = '<option value="">All Priorities</option>' +
      priorities.map(priority => `<option value="${priority}">${priority}</option>`).join('');
  }
}

// Apply filters
function applyFilters() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const statusFilter = document.getElementById('statusFilter').value;
  const priorityFilter = document.getElementById('priorityFilter').value;
  const dateFrom = document.getElementById('dateFromFilter').value;
  const dateTo = document.getElementById('dateToFilter').value;

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
    if (statusFilter) {
      const normalized = normalizeStatus(row[cm.status]);
      if (normalized !== statusFilter) return false;
    }

    // Priority filter
    if (priorityFilter && row[cm.priority] !== priorityFilter) {
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
  if (show) {
    overlay.classList.remove('hidden');
  } else {
    overlay.classList.add('hidden');
  }
}

function showError(message) {
  const errorDiv = document.getElementById('errorMessage');
  const errorText = document.getElementById('errorText');
  errorText.textContent = message;
  errorDiv.style.display = 'block';
}

function hideError() {
  document.getElementById('errorMessage').style.display = 'none';
}

function updateConnectionStatus(status) {
  const statusElement = document.getElementById('connectionStatus');
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
  document.getElementById('lastUpdated').textContent = `Last updated: ${timeString}`;
}

// Event listeners
function setupEventListeners() {
  // Refresh button
  document.getElementById('refreshBtn').addEventListener('click', async () => {
    const btn = document.getElementById('refreshBtn');
    btn.classList.add('spinning');
    await fetchSheetData();
    setTimeout(() => btn.classList.remove('spinning'), 1000);
  });

  // Retry button
  document.getElementById('retryBtn').addEventListener('click', () => {
    fetchSheetData();
  });

  // Search input
  document.getElementById('searchInput').addEventListener('input', applyFilters);

  // Filter dropdowns
  document.getElementById('statusFilter').addEventListener('change', applyFilters);
  document.getElementById('priorityFilter').addEventListener('change', applyFilters);
  document.getElementById('dateFromFilter').addEventListener('change', applyFilters);
  document.getElementById('dateToFilter').addEventListener('change', applyFilters);

  // Rows per page
  document.getElementById('rowsPerPage').addEventListener('change', (e) => {
    state.pageSize = parseInt(e.target.value);
    state.currentPage = 1;
    updatePagination();
    updateTable();
  });

  // Pagination buttons
  document.getElementById('prevPage').addEventListener('click', () => {
    if (state.currentPage > 1) {
      state.currentPage--;
      updatePagination();
      updateTable();
    }
  });

  document.getElementById('nextPage').addEventListener('click', () => {
    const totalPages = Math.ceil(state.filteredData.length / state.pageSize);
    if (state.currentPage < totalPages) {
      state.currentPage++;
      updatePagination();
      updateTable();
    }
  });

  // Modal close
  document.getElementById('modalClose').addEventListener('click', () => {
    document.getElementById('descriptionModal').classList.remove('show');
  });

  // Close modal on outside click
  document.getElementById('descriptionModal').addEventListener('click', (e) => {
    if (e.target.id === 'descriptionModal') {
      document.getElementById('descriptionModal').classList.remove('show');
    }
  });

  // Export button
  document.getElementById('exportBtn').addEventListener('click', exportToCSV);
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