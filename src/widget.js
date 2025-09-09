import React from 'react';
import { createRoot } from 'react-dom/client';
import JobsListing from './components/JobsListing.js';

// Global function to mount the jobs listing widget
window.CalAmCareersWidget = {
  mount: (elementId, options = {}) => {
    const container = document.getElementById(elementId);
    if (!container) {
      console.error(`CalAm Careers Widget: Element with id "${elementId}" not found`);
      return;
    }

    const root = createRoot(container);
    root.render(
      <JobsListing
        apiUrl={options.apiUrl}
        onJobClick={options.onJobClick}
        {...options}
      />
    );

    return {
      unmount: () => {
        root.unmount();
      },
      update: (newOptions) => {
        root.render(
          <JobsListing
            apiUrl={newOptions.apiUrl || options.apiUrl}
            onJobClick={newOptions.onJobClick || options.onJobClick}
            {...options}
            {...newOptions}
          />
        );
      }
    };
  }
};

// Auto-mount if data-calam-careers attribute is found
document.addEventListener('DOMContentLoaded', () => {
  const autoMountElements = document.querySelectorAll('[data-calam-careers]');

  autoMountElements.forEach(element => {
    const options = {
      apiUrl: element.dataset.apiUrl,
      onJobClick: window[element.dataset.onJobClick] || undefined
    };

    if (!element.id) {
      element.id = 'calam-careers-' + Math.random().toString(36).substr(2, 9);
    }

    window.CalAmCareersWidget.mount(element.id, options);
  });
});
