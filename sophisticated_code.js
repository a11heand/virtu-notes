/* 
Filename: sophisticated_code.js

This code demonstrates an advanced image gallery that allows users to upload, edit, and share images with various filters and effects.
*/
 
// Global variables
let currentImageIndex = 0;
let images = [];

/**
 * Represents an image in the gallery.
 */
class Image {
  constructor(name, url, filters) {
    this.name = name;
    this.url = url;
    this.filters = filters;
  }

  applyFilters() {
    // Applying filters to the image
    console.log("Applying filters to: " + this.name);
  }

  updateFilters(newFilters) {
    // Updating image filters
    console.log("Updating filters for: " + this.name);
    this.filters = newFilters;
  }
}

/**
 * Represents the image gallery and its functionalities.
 */
class ImageGallery {
  constructor() {
    console.log("Creating ImageGallery");
    // Initializing default images
    images.push(new Image("Nature1", "https://example.com/nature1.jpg", ["blur", "brightness"]));
    images.push(new Image("Nature2", "https://example.com/nature2.jpg", ["sepia", "contrast"]));
    // ...
  }

  uploadImage(name, url) {
    // Uploading a new image to the gallery
    console.log("Uploading image: " + name);
    images.push(new Image(name, url, []));
  }

  deleteImage(name) {
    // Deleting an image from the gallery
    console.log("Deleting image: " + name);
    images = images.filter(image => image.name !== name);
  }

  editImageFilters(name, newFilters) {
    // Editing image filters
    const image = images.find(image => image.name === name);
    if (image) {
      image.updateFilters(newFilters);
    } else {
      console.log("Image not found!");
    }
  }

  viewImageByIndex(index) {
    // Viewing image by index
    const image = images[index];
    if (image) {
      console.log("Viewing image: " + image.name);
      image.applyFilters();
    } else {
      console.log("Image not found!");
    }
  }
}

// Usage example
const gallery = new ImageGallery();
gallery.uploadImage("City", "https://example.com/city.jpg");
gallery.editImageFilters("Nature1", ["blur", "sepia"]);

gallery.viewImageByIndex(1);
gallery.deleteImage("Nature2");
gallery.viewImageByIndex(5);

console.log("Program finished!");