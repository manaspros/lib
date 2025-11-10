# Facilities Images Folder

Place your facility equipment images in this folder with the following naming convention:

## Image Names (as defined in constants.js):

1. `bamboo-labs-x1e.jpg` - Bamboo Labs X1 E 3D Printer
2. `pratham-3.jpg` - Pratham 3.0 3D Printer
3. `phrozen-sonic.jpg` - Phrozen Sonic Mega 8K V2 Resin 3D Printer
4. `anycubic-kobra.jpg` - Anycubic Kobra 2 Neo 3D Printer
5. `scientech-827.jpg` - Scientech 827 Workbench
6. `esd-workstation.jpg` - ESD Workstation
7. `wheelchair-treadmill.jpg` - Electric Wheelchair and Treadmill
8. `myrio-1900.jpg` - Myrio 1900 Control System
9. `cubemars-actuators.jpg` - CubeMars AK Series Actuators
10. `metallic-breadboard.jpg` - Metallic Breadboard

## Image Requirements:

- **Format**: JPG or PNG
- **Recommended Size**: 800x600 pixels or higher
- **Aspect Ratio**: 4:3 (landscape orientation works best)
- **File Size**: Keep under 2MB for optimal loading

## How It Works:

When you click on any facility card in the Facilities page:
- The image will be displayed full-size on the left side of the modal
- The specifications will be shown on the right side
- Users can close the modal by clicking the X button or clicking outside

## Adding New Facilities:

To add a new facility, update `src/utils/constants.js` in the `FACILITIES` array with:
- `id`: Unique number
- `name`: Equipment name
- `category`: Category type (3D Printing, Electronics, etc.)
- `image`: Path to image `/facilities/your-image.jpg`
- `thumbnail`: Same as image path
- `specifications`: Array of {label, value} objects
