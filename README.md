Webpster
========

**Webpster** is a simple command-line tool for converting JPG and PNG images to WebP format. It's easy to use and helps optimize images for the web.

Features
--------

*   Batch conversion of JPG and PNG images to WebP.
*   Customizable output quality (default is 50).
*   User-friendly command-line interface.

Installation
------------

1.  Clone the repository:  
    `git clone https://github.com/alexshurkoff/webpster.git`
2.  Navigate to the project directory:  
    `cd webpster`
3.  Install the dependencies:  
    `npm install`

Usage
-----

By default, place your images in an `input` folder and run:

```bash
    node webpster.js
```
Converted images will be saved in the `output` folder with a default quality of **50**.

To specify custom input/output folders and quality:

```bash
    node webpster.js i=yourInputFolder o=yourOutputFolder q=qualityValue
```

**Note:** The `qualityValue` should be an integer between 0 and 100.

### Example:

```bash
    node webpster.js i=images o=webp_images q=80
```

License
-------

This project is licensed under the ISC License.