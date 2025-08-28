Generate a code snippet for A-Frame (AR.js) that enables the recognition of different vertically oriented markers and projects distinct text with a dark background, based on the current focused marker. Texts should have the following structure: Title, Subtitle, and Description. The code should include a clear example of how to integrate the marker recognition and text projection features. The text must have the Please provide the code in JavaScript, using the A-Frame framework, and include any necessary HTML and CSS for a complete example.

Key Features Explained:
1. Multiple Marker Types
    Hiro Marker: Built-in preset marker
    Kanji Marker: Another built-in preset
    Custom Pattern: Uses .patt files (you need to generate these)
    Barcode Marker: Matrix-style marker with numeric ID

2. Text Structure
Each marker displays:
    Title: Large, bold text in distinctive colors
    Subtitle: Medium-sized descriptive text
    Description: Detailed information with line breaks

3. Dark Background
    Semi-transparent dark panels behind text
    Ensures readability in various lighting conditions
    Different opacity levels for visual variety

4. Interactive Features
    Smooth entrance/exit animations
    Console logging for debugging
    Event-driven visibility control

5. Customization Options
    Dynamic content creation function
    Configurable colors and styling
    Responsive text sizing

Usage Instructions:
    For Custom Patterns: Generate .patt files using the AR.js Marker Training
    For Barcode Markers: Use different numeric values (0-63) for the value attribute
    Vertical Orientation: The markers work in any orientation, but ensure good lighting and contrast for optimal tracking
    Testing: Use the provided Hiro and Kanji markers first, as they don't require additional files

This code provides a complete, working AR.js application with multiple marker recognition and rich text display capabilities.
