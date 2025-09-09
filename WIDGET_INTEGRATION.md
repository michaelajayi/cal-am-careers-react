# Cal-Am Careers Widget Integration Guide

This guide explains how to integrate the Cal-Am Careers React widget into your existing HTML pages.

## Quick Start

### 1. Build the Widget

```bash
npm run build:widget
```

This creates `dist/cal-am-careers-widget.js` - a standalone JavaScript file containing the entire widget.

### 2. Add to Your HTML Page

```html
<!-- Include the widget script -->
<script src="path/to/cal-am-careers-widget.js"></script>

<!-- Create a container for the widget -->
<div id="jobs-listing" data-calam-careers></div>
```

That's it! The widget will automatically mount to any element with the `data-calam-careers` attribute.

## Integration Methods

### Method 1: Automatic Mounting (Recommended)

Add the `data-calam-careers` attribute to any div:

```html
<div id="jobs-container" data-calam-careers data-api-url="/api/jobs"></div>
<script src="dist/cal-am-careers-widget.js"></script>
```

**Supported data attributes:**
- `data-api-url` - URL to fetch jobs from (optional, uses mock data if not provided)
- `data-on-job-click` - Name of global function to handle job clicks

### Method 2: Manual Mounting

For more control, mount the widget manually:

```html
<div id="my-jobs-widget"></div>
<script src="dist/cal-am-careers-widget.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
    const widget = window.CalAmCareersWidget.mount('my-jobs-widget', {
        apiUrl: '/api/jobs',
        onJobClick: function(job) {
            console.log('Job clicked:', job);
            // Handle job click - open modal, navigate, etc.
        }
    });
    
    // Optional: Update widget later
    // widget.update({ apiUrl: '/api/different-jobs' });
    
    // Optional: Unmount widget
    // widget.unmount();
});
</script>
```

## API Integration

### Expected API Response Format

Your API endpoint should return JSON in this format:

```json
[
    {
        "id": 1,
        "department": "Maintenance",
        "position": "Maintenance Supervisor #142",
        "city": "Coeur d'Alene",
        "state": "ID"
    },
    {
        "id": 2,
        "department": "Office - Manager - Clerical",
        "position": "Activities Director RV #134",
        "city": "Mesa",
        "state": "AZ"
    }
]
```

**Required fields:**
- `id` - Unique identifier for the job
- `department` - Job department/category
- `position` - Job title/position name
- `city` - Job location city
- `state` - Job location state (2-letter code)

### Mock Data

If no API URL is provided, the widget uses built-in mock data for demonstration purposes.

## Styling

The widget includes its own CSS styles that match the Cal-Am Properties design. The styles are scoped to avoid conflicts with your existing CSS.

### Custom Styling

You can override widget styles by adding CSS after the widget loads:

```css
/* Override widget styles */
.jobs-listing .jobs-title {
    color: #your-color !important;
}

.jobs-listing .search-button {
    background-color: #your-brand-color !important;
}
```

## Event Handling

### Job Click Handling

When a user clicks on a job position, you can handle it in several ways:

**Option 1: Global function (data attribute method)**
```html
<div data-calam-careers data-on-job-click="handleJobClick"></div>
<script>
function handleJobClick(job) {
    // Open job details page
    window.location.href = '/job-details/' + job.id;
}
</script>
```

**Option 2: Callback function (manual mounting)**
```javascript
CalAmCareersWidget.mount('container', {
    onJobClick: function(job) {
        // Open in modal
        openJobModal(job);
        
        // Or navigate to job details
        window.open('/jobs/' + job.id, '_blank');
    }
});
```

## Browser Support

The widget supports:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- IE 11 (with polyfills)

## File Size

- Minified widget: ~192KB (includes React runtime)
- Gzipped: ~60KB

## Deployment

### Production Deployment

1. Build the widget: `npm run build:widget`
2. Upload `dist/cal-am-careers-widget.js` to your web server
3. Include the script in your HTML pages
4. Configure your API endpoint

### CDN Deployment

For better performance, serve the widget from a CDN:

```html
<script src="https://cdn.yoursite.com/cal-am-careers-widget.js"></script>
```

## Development

### Development Build

For development with source maps and easier debugging:

```bash
npm run build:widget:dev
```

This creates an unminified version with source maps.

### Making Changes

1. Edit components in `src/components/`
2. Rebuild with `npm run build:widget`
3. Test in your HTML page

## Troubleshooting

### Widget Not Loading

- Check browser console for JavaScript errors
- Verify the widget script path is correct
- Ensure the target div has a unique ID

### API Issues

- Check network tab for failed API requests
- Verify API returns correct JSON format
- Test API endpoint directly in browser

### Styling Issues

- Use browser dev tools to inspect widget CSS
- Check for CSS conflicts with existing styles
- Add `!important` to override widget styles if needed

## Example Integration

See `example-integration.html` for a complete working example of integrating the widget into an existing careers page.

## Support

For technical support or customization requests, contact the development team.