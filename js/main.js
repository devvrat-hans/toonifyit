const App = (() => {
  const state = {
    format: 'json',
    options: {
      delimiter: ',',
      indent: 2,
      lengthMarker: true
    }
  };

  const elements = {
    inputArea: document.querySelector('[data-input="main"]'),
    outputArea: document.querySelector('[data-output="main"]'),
    errorDisplay: document.querySelector('[data-error="input"]'),
    formatSelect: document.querySelector('[data-option="format"]'),
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

    const convertToToon = (data, depth) => {
      const indent = ' '.repeat(state.options.indent * depth);
      const delimiter = state.options.delimiter === '\\t' ? '\t' : state.options.delimiter;

      if (Array.isArray(data)) {
        if (data.length === 0) return '[]';
        
        const firstItem = data[0];
        if (typeof firstItem === 'object' && firstItem !== null && !Array.isArray(firstItem)) {
          const keys = Object.keys(firstItem);
          const lengthMarker = state.options.lengthMarker ? `[${data.length}]` : '';
          let result = `items${lengthMarker}{${keys.join(delimiter)}}:\n`;
          
          data.forEach(item => {
            const values = keys.map(key => {
              const val = item[key];
              if (val === null) return '';
              if (typeof val === 'string') return val;
              return String(val);
            });
            result += indent + '  ' + values.join(delimiter) + '\n';
          });
          return result;
        } else {
          const lengthMarker = state.options.lengthMarker ? `[${data.length}]` : '';
          return `items${lengthMarker}: ${data.map(item => JSON.stringify(item)).join(delimiter)}`;
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

    const toonToJson = (toonStr) => {
      const lines = toonStr.trim().split('\n').filter(line => line.trim());
      
      if (lines[0].includes('{') && lines[0].includes('}:')) {
        const headerMatch = lines[0].match(/items(?:\[\d+\])?\{([^}]+)\}:/);
        if (headerMatch) {
          const keys = headerMatch[1].split(',').map(k => k.trim());
          const items = [];
          
          for (let i = 1; i < lines.length; i++) {
            const values = lines[i].trim().split(',').map(v => v.trim());
            const obj = {};
            keys.forEach((key, idx) => {
              obj[key] = values[idx] || '';
            });
            items.push(obj);
          }
          return JSON.stringify(items, null, state.options.indent);
        }
      }
      
      return '{}';
    };

    return { jsonToToon, toonToJson, estimateTokens };
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
        let output;
        if (state.format === 'json') {
          output = Converter.jsonToToon(input);
          updateStats(input, output);
        } else {
          output = Converter.toonToJson(input);
          updateStats(output, input);
        }
        elements.outputArea.value = output;
        clearError();
      } catch (error) {
        showError('Invalid input: ' + error.message);
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

      elements.formatSelect.addEventListener('change', (e) => {
        state.format = e.target.value;
        const temp = elements.inputArea.value;
        elements.inputArea.value = elements.outputArea.value;
        elements.outputArea.value = temp;
        convert();
      });

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
        const extension = state.format === 'json' ? 'toon' : 'json';
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `converted.${extension}`;
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
        const example = JSON.stringify([
          { id: 1, name: 'Alice', age: 30, city: 'New York' },
          { id: 2, name: 'Bob', age: 25, city: 'San Francisco' },
          { id: 3, name: 'Charlie', age: 35, city: 'Chicago' }
        ], null, 2);
        elements.inputArea.value = example;
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
      elements.formatSelect.value = state.format;
      elements.delimiterSelect.value = state.options.delimiter;
      elements.indentSelect.value = state.options.indent;
      elements.lengthMarkerCheckbox.checked = state.options.lengthMarker;
    };

    return { bindEvents, init };
  })();

  return {
    init: () => {
      UI.init();
      UI.bindEvents();
    }
  };
})();

document.addEventListener('DOMContentLoaded', App.init);
