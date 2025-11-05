const App = (() => {
  const state = {
    options: {
      delimiter: ',',
      indent: 2,
      lengthMarker: true
    },
    currentExampleIndex: 0
  };

  const examples = [
    {
      name: 'User Records',
      data: [
        { id: 1, name: 'Alice Johnson', age: 30, city: 'New York', role: 'Developer' },
        { id: 2, name: 'Bob Smith', age: 25, city: 'San Francisco', role: 'Designer' },
        { id: 3, name: 'Charlie Brown', age: 35, city: 'Chicago', role: 'Manager' }
      ]
    },
    {
      name: 'Product Catalog',
      data: [
        { sku: 'PROD-001', product: 'Laptop', price: 1299.99, stock: 45, category: 'Electronics' },
        { sku: 'PROD-002', product: 'Mouse', price: 29.99, stock: 150, category: 'Accessories' },
        { sku: 'PROD-003', product: 'Keyboard', price: 89.99, stock: 78, category: 'Accessories' },
        { sku: 'PROD-004', product: 'Monitor', price: 349.99, stock: 32, category: 'Electronics' }
      ]
    },
    {
      name: 'Sales Data',
      data: [
        { date: '2025-01-01', region: 'North', sales: 15420.50, units: 234, rep: 'John' },
        { date: '2025-01-02', region: 'South', sales: 18750.75, units: 312, rep: 'Sarah' },
        { date: '2025-01-03', region: 'East', sales: 12300.00, units: 189, rep: 'Mike' },
        { date: '2025-01-04', region: 'West', sales: 21500.25, units: 401, rep: 'Emma' }
      ]
    },
    {
      name: 'API Response (GitHub Repos)',
      data: [
        { id: 12345, name: 'awesome-project', stars: 2451, forks: 389, language: 'JavaScript' },
        { id: 67890, name: 'cool-library', stars: 891, forks: 145, language: 'Python' },
        { id: 54321, name: 'web-framework', stars: 5620, forks: 782, language: 'TypeScript' }
      ]
    },
    {
      name: 'Analytics Dashboard',
      data: [
        { metric: 'Page Views', current: 45230, previous: 42180, change: 7.2, status: 'up' },
        { metric: 'Unique Visitors', current: 12450, previous: 13100, change: -5.0, status: 'down' },
        { metric: 'Avg Session Time', current: 342, previous: 315, change: 8.6, status: 'up' },
        { metric: 'Bounce Rate', current: 42.3, previous: 45.8, change: -7.6, status: 'up' }
      ]
    },
    {
      name: 'E-Commerce Orders',
      data: {
        orderId: 'ORD-2025-001',
        customer: 'Jane Doe',
        total: 247.98,
        items: [
          { product: 'T-Shirt', quantity: 2, price: 29.99 },
          { product: 'Jeans', quantity: 1, price: 89.99 },
          { product: 'Sneakers', quantity: 1, price: 98.00 }
        ],
        shipping: { method: 'Express', cost: 12.99, address: '123 Main St, NY' }
      }
    }
  ];

  const elements = {
    inputArea: document.querySelector('[data-input="main"]'),
    outputArea: document.querySelector('[data-output="main"]'),
    errorDisplay: document.querySelector('[data-error="input"]'),
    delimiterSelect: document.querySelector('[data-option="delimiter"]'),
    indentSelect: document.querySelector('[data-option="indent"]'),
    lengthMarkerCheckbox: document.querySelector('[data-option="length-marker"]'),
    copyButton: document.querySelector('[data-action="copy"]'),
    downloadButton: document.querySelector('[data-action="download"]'),
    clearButton: document.querySelector('[data-action="clear"]'),
    exampleButton: document.querySelector('[data-action="load-example"]'),
    jsonTokensStat: document.querySelector('[data-stat="json-tokens"]'),
    toonTokensStat: document.querySelector('[data-stat="toon-tokens"]'),
    savedStat: document.querySelector('[data-stat="saved"]'),
    toast: document.querySelector('[data-toast]')
  };

  const Converter = (() => {
    const estimateTokens = (text) => {
      return Math.ceil(text.length / 4);
    };

    const jsonToToon = (jsonStr) => {
      const data = JSON.parse(jsonStr);
      return convertToToon(data, 0);
    };

    const isTabularArray = (arr) => {
      if (arr.length === 0) return false;
      
      const firstItem = arr[0];
      if (typeof firstItem !== 'object' || firstItem === null || Array.isArray(firstItem)) {
        return false;
      }
      
      const keys = Object.keys(firstItem);
      
      for (const item of arr) {
        if (typeof item !== 'object' || item === null || Array.isArray(item)) {
          return false;
        }
        
        const itemKeys = Object.keys(item);
        if (itemKeys.length !== keys.length || !itemKeys.every(k => keys.includes(k))) {
          return false;
        }
        
        // Check all values are primitives (not objects or arrays)
        for (const value of Object.values(item)) {
          if (value !== null && typeof value === 'object') {
            return false;
          }
        }
      }
      
      return true;
    };

    const convertToToon = (data, depth) => {
      const indent = ' '.repeat(state.options.indent * depth);
      const delimiter = state.options.delimiter === '\\t' ? '\t' : state.options.delimiter;

      if (Array.isArray(data)) {
        if (data.length === 0) return '[]';
        
        // Check if this is a tabular array (all objects with only primitive values)
        if (isTabularArray(data)) {
          const firstItem = data[0];
          const keys = Object.keys(firstItem);
          const lengthMarker = state.options.lengthMarker ? `[${data.length}]` : '';
          let result = `items${lengthMarker}{${keys.join(delimiter)}}:\n`;
          
          data.forEach(item => {
            const values = keys.map(key => {
              const val = item[key];
              if (val === null || val === undefined) return '';
              if (typeof val === 'string') return val;
              return String(val);
            });
            result += indent + '  ' + values.join(delimiter) + '\n';
          });
          return result;
        } else {
          // Use list format for non-tabular arrays
          const lengthMarker = state.options.lengthMarker ? `[${data.length}]` : '';
          let result = `items${lengthMarker}:\n`;
          data.forEach(item => {
            if (Array.isArray(item) || (typeof item === 'object' && item !== null)) {
              result += indent + '  - ' + convertToToon(item, depth + 1).trimStart();
            } else {
              result += indent + '  - ' + (item === null ? '' : String(item)) + '\n';
            }
          });
          return result;
        }
      } else if (typeof data === 'object' && data !== null) {
        let result = '';
        for (const [key, value] of Object.entries(data)) {
          if (Array.isArray(value)) {
            result += indent + key + ': ' + convertToToon(value, depth + 1);
          } else if (typeof value === 'object' && value !== null) {
            result += indent + key + ':\n' + convertToToon(value, depth + 1);
          } else {
            result += indent + key + ': ' + (value === null ? '' : String(value)) + '\n';
          }
        }
        return result;
      }
      return String(data);
    };

    return { jsonToToon, estimateTokens };
  })();

  const UI = (() => {
    const showToast = (message) => {
      elements.toast.textContent = message;
      elements.toast.classList.add('show');
      setTimeout(() => {
        elements.toast.classList.remove('show');
      }, 2000);
    };

    const showError = (message) => {
      elements.errorDisplay.textContent = message;
    };

    const clearError = () => {
      elements.errorDisplay.textContent = '';
    };

    const updateStats = (jsonText, toonText) => {
      const jsonTokens = Converter.estimateTokens(jsonText);
      const toonTokens = Converter.estimateTokens(toonText);
      const saved = jsonTokens > 0 ? Math.round(((jsonTokens - toonTokens) / jsonTokens) * 100) : 0;

      elements.jsonTokensStat.textContent = jsonTokens;
      elements.toonTokensStat.textContent = toonTokens;
      elements.savedStat.textContent = saved + '%';
    };

    const convert = () => {
      const input = elements.inputArea.value.trim();
      if (!input) {
        elements.outputArea.value = '';
        clearError();
        updateStats('', '');
        return;
      }

      try {
        const output = Converter.jsonToToon(input);
        elements.outputArea.value = output;
        
        // Calculate and show stats
        const jsonTokens = Converter.estimateTokens(input);
        const toonTokens = Converter.estimateTokens(output);
        const saved = jsonTokens > 0 ? Math.round(((jsonTokens - toonTokens) / jsonTokens) * 100) : 0;
        const tokensSavedCount = jsonTokens - toonTokens;
        
        updateStats(input, output);
        clearError();
        
        // Show toast notification with stats
        if (jsonTokens > 0 && tokensSavedCount > 0) {
          showToast(` Saved ${tokensSavedCount} tokens (${saved}% reduction)`);
        }
      } catch (error) {
        showError('Invalid JSON: ' + error.message);
        elements.outputArea.value = '';
        updateStats('', '');
      }
    };

    const debounce = (fn, delay) => {
      let timeoutId;
      return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
      };
    };

    const bindEvents = () => {
      elements.inputArea.addEventListener('input', debounce(convert, 300));

      elements.delimiterSelect.addEventListener('change', (e) => {
        state.options.delimiter = e.target.value;
        convert();
      });

      elements.indentSelect.addEventListener('change', (e) => {
        state.options.indent = parseInt(e.target.value);
        convert();
      });

      elements.lengthMarkerCheckbox.addEventListener('change', (e) => {
        state.options.lengthMarker = e.target.checked;
        convert();
      });

      elements.copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(elements.outputArea.value).then(() => {
          showToast('Copied to clipboard!');
        });
      });

      elements.downloadButton.addEventListener('click', () => {
        const content = elements.outputArea.value;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'converted.toon';
        a.click();
        URL.revokeObjectURL(url);
        showToast('Downloaded!');
      });

      elements.clearButton.addEventListener('click', () => {
        elements.inputArea.value = '';
        elements.outputArea.value = '';
        clearError();
        updateStats('', '');
      });

      elements.exampleButton.addEventListener('click', () => {
        // Get current example and cycle through
        const example = examples[state.currentExampleIndex];
        const jsonString = JSON.stringify(example.data, null, 2);
        elements.inputArea.value = jsonString;
        
        // Move to next example (cycle back to 0 when at end)
        state.currentExampleIndex = (state.currentExampleIndex + 1) % examples.length;
        
        convert();
      });

      document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
          e.preventDefault();
          convert();
        }
        if ((e.ctrlKey || e.metaKey) && e.key === '.') {
          e.preventDefault();
          elements.themeToggle.click();
        }
        if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
          e.preventDefault();
          elements.inputArea.focus();
        }
      });
    };

    const init = () => {
      elements.delimiterSelect.value = state.options.delimiter;
      elements.indentSelect.value = state.options.indent;
      elements.lengthMarkerCheckbox.checked = state.options.lengthMarker;
    };

    return { bindEvents, init, showToast };
  })();

  return {
    init: () => {
      UI.init();
      UI.bindEvents();
    }
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
