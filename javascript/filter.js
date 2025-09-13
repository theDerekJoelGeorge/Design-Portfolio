// Project Filter Functionality
class ProjectFilter {
  constructor() {
    this.projects = document.querySelectorAll('.project-card');
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.activeFilter = 'all';
    
    this.init();
  }

  init() {
    // Add click event listeners to filter buttons
    this.filterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const filter = button.getAttribute('data-filter');
        this.setActiveFilter(filter);
        this.filterProjects(filter);
      });
    });

    // Initialize with all projects visible
    this.filterProjects('all');
  }

  setActiveFilter(filter) {
    // Remove active class from all buttons
    this.filterButtons.forEach(btn => {
      btn.classList.remove('active');
    });

    // Add active class to clicked button
    const activeButton = document.querySelector(`[data-filter="${filter}"]`);
    if (activeButton) {
      activeButton.classList.add('active');
    }

    this.activeFilter = filter;
  }

  filterProjects(filter) {
    this.projects.forEach(project => {
      const tags = project.querySelectorAll('.tag');
      let shouldShow = false;

      if (filter === 'all') {
        shouldShow = true;
      } else {
        // Check if any tag matches the filter
        tags.forEach(tag => {
          if (tag.textContent.toLowerCase().includes(filter.toLowerCase())) {
            shouldShow = true;
          }
        });
      }

      // Show/hide project with animation
      if (shouldShow) {
        project.style.display = 'block';
        project.style.opacity = '0';
        project.style.transform = 'translateY(20px)';
        
        // Animate in
        setTimeout(() => {
          project.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          project.style.opacity = '1';
          project.style.transform = 'translateY(0)';
        }, 50);
      } else {
        // Animate out
        project.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        project.style.opacity = '0';
        project.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
          project.style.display = 'none';
        }, 300);
      }
    });

    // Update projects grid layout after filtering
    this.updateGridLayout();
  }

  updateGridLayout() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid) {
      // Force reflow to update grid layout
      projectsGrid.style.display = 'none';
      projectsGrid.offsetHeight; // Trigger reflow
      projectsGrid.style.display = 'grid';
    }
  }

  // Get all unique tags from projects
  static getUniqueTags() {
    const tags = new Set();
    const projectTags = document.querySelectorAll('.project-card .tag');
    
    projectTags.forEach(tag => {
      tags.add(tag.textContent.trim());
    });
    
    return Array.from(tags).sort();
  }
}

// Initialize filter when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize if we're on the projects page
  if (document.querySelector('.projects-grid')) {
    new ProjectFilter();
  }
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ProjectFilter;
}
