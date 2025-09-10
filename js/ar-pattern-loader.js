/**
 * AR.js Multi-Pattern Image Display System
 * This system loads multiple .patt files and displays corresponding .png images
 * in a vertical configuration when patterns are detected.
 */

class ARPatternLoader {
    constructor() {
        this.patterns = new Map(); // Store pattern configurations
        this.activeMarkers = new Set(); // Track active markers
        this.scene = null;
        this.assetsElement = null;
        this.verticalSpacing = 1.5; // Spacing between images in vertical layout
        this.imageScale = { x: 1, y: 1, z: 0.1 }; // Default image scale
        
        this.init();
    }

    /**
     * Initialize the AR system
     */
    init() {
        // Wait for A-Frame to be ready
        document.addEventListener('DOMContentLoaded', () => {
            this.scene = document.querySelector('a-scene');
            this.assetsElement = document.querySelector('a-assets');
            
            // Wait for scene to be loaded
            this.scene.addEventListener('loaded', () => {
                this.setupPatterns();
            });
        });
    }

    /**
     * Setup patterns configuration
     * Add your pattern and image pairs here
     */
    setupPatterns() {
        const patternConfigs = [
            {
                id: 'pattern1',
                patternUrl: 'patts/code01.patt',
                imageUrl: 'cards/card01.png',
                position: { x: 0, y: 2, z: 0 }
            },
            {
                id: 'pattern2',
                patternUrl: 'patts/code02.patt',
                imageUrl: 'cards/card02.png',
                position: { x: 0, y: 0.5, z: 0 }
            },
            {
                id: 'pattern3',
                patternUrl: 'patts/code03.patt',
                imageUrl: 'cards/card03.png',
                position: { x: 0, y: -1, z: 0 }
            }
        ];

        this.loadPatterns(patternConfigs);
    }

    /**
     * Load multiple patterns and their associated images
     * @param {Array} patternConfigs - Array of pattern configuration objects
     */
    async loadPatterns(patternConfigs) {
        const loadingElement = document.getElementById('loading');
        const patternCountElement = document.getElementById('pattern-count');

        try {
            for (let i = 0; i < patternConfigs.length; i++) {
                const config = patternConfigs[i];
                loadingElement.textContent = `Loading pattern ${i + 1}/${patternConfigs.length}...`;
                
                await this.loadSinglePattern(config);
                patternCountElement.textContent = i + 1;
            }

            loadingElement.style.display = 'none';
            console.log('All patterns loaded successfully');
        } catch (error) {
            console.error('Error loading patterns:', error);
            loadingElement.textContent = 'Error loading patterns. Please check console.';
        }
    }

    /**
     * Load a single pattern and create its marker
     * @param {Object} config - Pattern configuration object
     */
    loadSinglePattern(config) {
        return new Promise((resolve, reject) => {
            try {
                // Create image asset
                this.createImageAsset(config.id, config.imageUrl);
                
                // Create marker with pattern
                const marker = this.createMarker(config);
                
                // Create image plane for the marker
                const imagePlane = this.createImagePlane(config);
                marker.appendChild(imagePlane);
                
                // Add marker to scene
                this.scene.appendChild(marker);
                
                // Store pattern configuration
                this.patterns.set(config.id, {
                    ...config,
                    marker: marker,
                    imagePlane: imagePlane,
                    isVisible: false
                });

                // Setup marker event listeners
                this.setupMarkerEvents(marker, config.id);
                
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Create image asset element
     * @param {string} id - Asset ID
     * @param {string} imageUrl - Image URL
     */
    createImageAsset(id, imageUrl) {
        const img = document.createElement('img');
        img.setAttribute('id', `${id}-img`);
        img.setAttribute('src', imageUrl);
        img.setAttribute('crossorigin', 'anonymous');
        this.assetsElement.appendChild(img);
    }

    /**
     * Create AR marker element
     * @param {Object} config - Pattern configuration
     * @returns {Element} Marker element
     */
    createMarker(config) {
        const marker = document.createElement('a-marker');
        marker.setAttribute('type', 'pattern');
        marker.setAttribute('url', config.patternUrl);
        marker.setAttribute('id', `marker-${config.id}`);
        marker.setAttribute('smooth', 'true');
        marker.setAttribute('smoothCount', '10');
        marker.setAttribute('smoothTolerance', '0.01');
        marker.setAttribute('smoothThreshold', '5');
        
        return marker;
    }

    /**
     * Create image plane for displaying PNG image
     * @param {Object} config - Pattern configuration
     * @returns {Element} Image plane element
     */
    createImagePlane(config) {
        const plane = document.createElement('a-plane');
        plane.setAttribute('src', `#${config.id}-img`);
        plane.setAttribute('width', this.imageScale.x);
        plane.setAttribute('height', this.imageScale.y);
        plane.setAttribute('position', `${config.position.x} ${config.position.y} ${config.position.z}`);
        plane.setAttribute('rotation', '-90 0 0'); // Rotate to face up
        plane.setAttribute('transparent', 'true');
        plane.setAttribute('shader', 'flat');
        
        // Add animation for smooth appearance
        plane.setAttribute('animation__fadeIn', {
            property: 'material.opacity',
            from: 0,
            to: 1,
            dur: 500,
            autoplay: false
        });
        
        plane.setAttribute('animation__fadeOut', {
            property: 'material.opacity',
            from: 1,
            to: 0,
            dur: 300,
            autoplay: false
        });

        return plane;
    }

    /**
     * Setup event listeners for marker detection
     * @param {Element} marker - Marker element
     * @param {string} patternId - Pattern ID
     */
    setupMarkerEvents(marker, patternId) {
        // Marker found event
        marker.addEventListener('markerFound', () => {
            this.onMarkerFound(patternId);
        });

        // Marker lost event
        marker.addEventListener('markerLost', () => {
            this.onMarkerLost(patternId);
        });
    }

    /**
     * Handle marker found event
     * @param {string} patternId - Pattern ID that was found
     */
    onMarkerFound(patternId) {
        console.log(`Pattern found: ${patternId}`);
        
        const pattern = this.patterns.get(patternId);
        if (pattern && !pattern.isVisible) {
            pattern.isVisible = true;
            this.activeMarkers.add(patternId);
            
            // Show image with fade-in animation
            pattern.imagePlane.emit('fadeIn');
            
            // Update vertical layout
            this.updateVerticalLayout();
            
            // Update UI
            this.updateActiveCount();
        }
    }

    /**
     * Handle marker lost event
     * @param {string} patternId - Pattern ID that was lost
     */
    onMarkerLost(patternId) {
        console.log(`Pattern lost: ${patternId}`);
        
        const pattern = this.patterns.get(patternId);
        if (pattern && pattern.isVisible) {
            pattern.isVisible = false;
            this.activeMarkers.delete(patternId);
            
            // Hide image with fade-out animation
            pattern.imagePlane.emit('fadeOut');
            
            // Update vertical layout
            setTimeout(() => {
                this.updateVerticalLayout();
            }, 300); // Wait for fade-out animation
            
            // Update UI
            this.updateActiveCount();
        }
    }

    /**
     * Update vertical layout of visible images
     */
    updateVerticalLayout() {
        const activePatterns = Array.from(this.activeMarkers)
            .map(id => this.patterns.get(id))
            .filter(pattern => pattern.isVisible);

        // Calculate positions for vertical layout
        const totalHeight = (activePatterns.length - 1) * this.verticalSpacing;
        const startY = totalHeight / 2;

        activePatterns.forEach((pattern, index) => {
            const newY = startY - (index * this.verticalSpacing);
            const position = `${pattern.position.x} ${newY} ${pattern.position.z}`;
            
            // Animate to new position
            pattern.imagePlane.setAttribute('animation__position', {
                property: 'position',
                to: position,
                dur: 500,
                easing: 'easeInOutQuad'
            });
        });
    }

    /**
     * Update active pattern count in UI
     */
    updateActiveCount() {
        const activeCountElement = document.getElementById('active-count');
        activeCountElement.textContent = this.activeMarkers.size;
    }

    /**
     * Public method to add new pattern dynamically
     * @param {Object} config - Pattern configuration
     */
    async addPattern(config) {
        try {
            await this.loadSinglePattern(config);
            console.log(`Pattern ${config.id} added successfully`);
        } catch (error) {
            console.error(`Error adding pattern ${config.id}:`, error);
        }
    }

    /**
     * Public method to remove pattern
     * @param {string} patternId - Pattern ID to remove
     */
    removePattern(patternId) {
        const pattern = this.patterns.get(patternId);
        if (pattern) {
            // Remove from scene
            this.scene.removeChild(pattern.marker);
            
            // Remove from active markers
            this.activeMarkers.delete(patternId);
            
            // Remove from patterns map
            this.patterns.delete(patternId);
            
            // Update layout
            this.updateVerticalLayout();
            this.updateActiveCount();
            
            console.log(`Pattern ${patternId} removed successfully`);
        }
    }

    /**
     * Public method to update image scale
     * @param {Object} scale - Scale object {x, y, z}
     */
    setImageScale(scale) {
        this.imageScale = { ...this.imageScale, ...scale };
        
        // Update all existing image planes
        this.patterns.forEach(pattern => {
            pattern.imagePlane.setAttribute('width', this.imageScale.x);
            pattern.imagePlane.setAttribute('height', this.imageScale.y);
        });
    }

    /**
     * Public method to update vertical spacing
     * @param {number} spacing - Spacing between images
     */
    setVerticalSpacing(spacing) {
        this.verticalSpacing = spacing;
        this.updateVerticalLayout();
    }
}

// Initialize the AR Pattern Loader when the script loads
const arPatternLoader = new ARPatternLoader();

// Expose to global scope for external access
window.ARPatternLoader = arPatternLoader;

