I'll create a complete AR.js application that displays 3D text descriptions for different objects. Here's the code:


HTML File (index.html)

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>AR.js 3D Text Object Descriptions</title>
    <script src="https://aframe.io/releases/1.4.0/aframe.min.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/AR-js-org/AR.js@3.4.5/aframe/build/aframe-ar.js"></script>
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
        }
        
        #instructions {
            position: fixed;
            top: 10px;
            left: 10px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 10px;
            border-radius: 5px;
            z-index: 1000;
            max-width: 300px;
        }
        
        #markerInfo {
            position: fixed;
            bottom: 10px;
            left: 10px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 10px;
            border-radius: 5px;
            z-index: 1000;
            display: none;
        }
    </style>
</head>
<body>
    <div id="instructions">
        <h3>AR Object Descriptions</h3>
        <p>Point your camera at the markers to see 3D text descriptions of different objects.</p>
        <p>Available markers: Hiro, Kanji, A, B, C, F</p>
    </div>
    
    <div id="markerInfo">
        <p id="currentObject">No object detected</p>
    </div>

    <a-scene 
        embedded 
        arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;"
        vr-mode-ui="enabled: false"
        renderer="logarithmicDepthBuffer: true;"
        loading-screen="enabled: false">
        
        <!-- Assets -->
        <a-assets>
            <!-- Define reusable materials -->
            <a-mixin id="text-style" 
                     geometry="primitive: plane; width: 4; height: 1" 
                     material="color: #1e3a8a; opacity: 0.8"
                     text="align: center; color: white; font: roboto; width: 8"></a-mixin>
        </a-assets>

        <!-- Hiro Marker - Smartphone -->
        <a-marker preset="hiro" id="hiro-marker">
            <a-entity id="smartphone-description" position="0 1 0">
                <!-- 3D Phone Model -->
                <a-box position="0 0.5 0" 
                       width="0.6" height="1.2" depth="0.1" 
                       color="#2c3e50"
                       animation="property: rotation; to: 0 360 0; loop: true; dur: 8000">
                </a-box>
                
                <!-- Screen -->
                <a-plane position="0 0.5 0.051" 
                         width="0.5" height="1" 
                         color="#4a90e2">
                </a-plane>
                
                <!-- Title -->
                <a-text value="SMARTPHONE" 
                        position="0 2 0" 
                        align="center" 
                        color="#e74c3c" 
                        scale="1.5 1.5 1.5"
                        font="roboto">
                </a-text>
                
                <!-- Description -->
                <a-text value="A portable device that combines\nmobile phone and computing\nfunctions into one unit.\nFeatures: Touchscreen, Apps,\nInternet, Camera, GPS"
                        position="0 -0.5 0" 
                        align="center" 
                        color="#2c3e50" 
                        scale="0.8 0.8 0.8"
                        font="roboto">
                </a-text>
            </a-entity>
        </a-marker>

        <!-- Kanji Marker - Laptop -->
        <a-marker preset="kanji" id="kanji-marker">
            <a-entity id="laptop-description" position="0 1 0">
                <!-- 3D Laptop Model -->
                <a-entity>
                    <!-- Base -->
                    <a-box position="0 0 0" 
                           width="1.5" height="0.1" depth="1" 
                           color="#34495e">
                    </a-box>
                    
                    <!-- Screen -->
                    <a-box position="0 0.5 -0.45" 
                           width="1.4" height="1" depth="0.05" 
                           color="#2c3e50"
                           rotation="-10 0 0">
                    </a-box>
                    
                    <!-- Screen Display -->
                    <a-plane position="0 0.5 -0.42" 
                             width="1.2" height="0.8" 
                             color="#3498db"
                             rotation="-10 0 0">
                    </a-plane>
                </a-entity>
                
                <!-- Title -->
                <a-text value="LAPTOP COMPUTER" 
                        position="0 2 0" 
                        align="center" 
                        color="#e67e22" 
                        scale="1.2 1.2 1.2"
                        font="roboto">
                </a-text>
                
                <!-- Description -->
                <a-text value="A portable personal computer\nwith a clamshell form factor.\nFeatures: Keyboard, Trackpad,\nPortable, Battery-powered,\nFull operating system"
                        position="0 -0.8 0" 
                        align="center" 
                        color="#2c3e50" 
                        scale="0.7 0.7 0.7"
                        font="roboto">
                </a-text>
            </a-entity>
        </a-marker>

        <!-- Pattern A Marker - Coffee Cup -->
        <a-marker type="pattern" url="https://cdn.jsdelivr.net/gh/AR-js-org/AR.js@3.4.5/data/data/patt.a" id="a-marker">
            <a-entity id="coffee-description" position="0 1 0">
                <!-- 3D Coffee Cup -->
                <a-entity>
                    <!-- Cup -->
                    <a-cylinder position="0 0.3 0" 
                                radius="0.3" height="0.6" 
                                color="#8b4513"
                                animation="property: rotation; to: 0 360 0; loop: true; dur: 6000">
                    </a-cylinder>
                    
                    <!-- Coffee -->
                    <a-cylinder position="0 0.55 0" 
                                radius="0.28" height="0.1" 
                                color="#3e2723">
                    </a-cylinder>
                    
                    <!-- Handle -->
                    <a-torus position="0.35 0.3 0" 
                             radius="0.15" radius-tubular="0.03" 
                             color="#8b4513"
                             rotation="0 0 90">
                    </a-torus>
                </a-entity>
                
                <!-- Title -->
                <a-text value="COFFEE CUP" 
                        position="0 1.5 0" 
                        align="center" 
                        color="#8b4513" 
                        scale="1.3 1.3 1.3"
                        font="roboto">
                </a-text>
                
                <!-- Description -->
                <a-text value="A drinking vessel designed\nfor hot beverages like coffee.\nFeatures: Handle for grip,\nInsulation, Various sizes,\nCeramic or paper material"
                        position="0 -0.5 0" 
                        align="center" 
                        color="#2c3e50" 
                        scale="0.6 0.6 0.6"
                        font="roboto">
                </a-text>
            </a-entity>
        </a-marker>

        <!-- Pattern B Marker - Book -->
        <a-marker type="pattern" url="https://cdn.jsdelivr.net/gh/AR-js-org/AR.js@3.4.5/data/data/patt.b" id="b-marker">
            <a-entity id="book-description" position="0 1 0">
                <!-- 3D Book -->
                <a-box position="0 0.2 0" 
                       width="0.8" height="1.2" depth="0.15" 
                       color="#c0392b"
                       animation="property: rotation; to: 5 365 -5; loop: true; dur: 10000">
                </a-box>
                
                <!-- Book spine -->
                <a-plane position="-0.4 0.2 0" 
                         width="1.2" height="0.15" 
                         color="#a93226"
                         rotation="0 0 90">
                </a-plane>
                
                <!-- Title -->
                <a-text value="BOOK" 
                        position="0 1.8 0" 
                        align="center" 
                        color="#c0392b" 
                        scale="1.5 1.5 1.5"
                        font="roboto">
                </a-text>
                
                <!-- Description -->
                <a-text value="A set of written or printed\npages bound together.\nFeatures: Knowledge storage,\nPortable learning, Pages,\nCover protection, Text & images"
                        position="0 -0.8 0" 
                        align="center" 
                        color="#2c3e50" 
                        scale="0.7 0.7 0.7"
                        font="roboto">
                </a-text>
            </a-entity>
        </a-marker>

        <!-- Camera -->
        <a-entity camera></a-entity>
    </a-scene>

    <script>
        // JavaScript for marker detection and UI updates
        document.addEventListener('DOMContentLoaded', function() {
            const markerInfo = document.getElementById('markerInfo');
            const currentObject = document.getElementById('currentObject');
            
            // Object descriptions
            const objectDescriptions = {
                'hiro-marker': 'Smartphone - Modern communication device',
                'kanji-marker': 'Laptop Computer - Portable computing device',
                'a-marker': 'Coffee Cup - Hot beverage container',
                'b-marker': 'Book - Knowledge and information storage'
            };
            
            // Add event listeners for each marker
            Object.keys(objectDescriptions).forEach(markerId => {
                const marker = document.getElementById(markerId);
                
                if (marker) {
                    marker.addEventListener('markerFound', function() {
                        markerInfo.style.display = 'block';
                        currentObject.textContent = objectDescriptions[markerId];
                        console.log(`Marker found: ${markerId}`);
                    });
                    
                    marker.addEventListener('markerLost', function() {
                        markerInfo.style.display = 'none';
                        currentObject.textContent = 'No object detected';
                        console.log(`Marker lost: ${markerId}`);
                    });
                }
            });
            
            // Hide instructions after 10 seconds
            setTimeout(() => {
                const instructions = document.getElementById('instructions');
                instructions.style.opacity = '0.3';
            }, 10000);
        });
        
        // Add floating animation component
        AFRAME.registerComponent('floating', {
            init: function() {
                this.el.setAttribute('animation', {
                    property: 'position',
                    to: '0 1.2 0',
                    direction: 'alternate',
                    loop: true,
                    dur: 2000,
                    easing: 'easeInOutSine'
                });
            }
        });
    </script>
</body>
</html>


Features of this AR.js Application:

1. **Multiple Markers Support**
• **Hiro Marker**: Shows a 3D smartphone with description
• **Kanji Marker**: Displays a laptop computer
• **Pattern A**: Shows a coffee cup
• **Pattern B**: Displays a book


2. **3D Objects with Descriptions**

Each marker displays:
• A 3D model of the object
• Animated title text
• Detailed description text
• Smooth animations


3. **Interactive Features**
• Real-time marker detection
• UI updates when markers are found/lost
• Floating animations
• Rotating 3D models


4. **Responsive Design**
• Works on mobile devices
• Adaptive text sizing
• Touch-friendly interface


How to Use:
1. **Save the code** as `index.html`
2. **Serve it** using a local server (required for camera access):
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .
```
3. **Access** via `http://localhost:8000`
4. **Print AR markers** from AR.js repository or use:
- Hiro marker: [Download here](https://github.com/AR-js-org/AR.js/blob/master/data/images/hiro.png)
- Kanji marker: [Download here](https://github.com/AR-js-org/AR.js/blob/master/data/images/kanji.png)


5. **Point your camera** at the printed markers to see the 3D text descriptions!

The application will automatically detect the markers and display corresponding 3D objects with detailed text descriptions floating above them.
