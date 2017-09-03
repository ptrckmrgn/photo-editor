const resizeCanvas = (cropper) => {
    const PADDING = 50;
    const canvasData = cropper.getCanvasData();
    const imageData = cropper.getImageData();
    const containerData = cropper.getContainerData();

    // Get lesser ratio of outer dimension to inner dimension
    const ratio = Math.min((containerData.width - PADDING) / imageData.naturalWidth,
            (containerData.height - PADDING) / imageData.naturalHeight);

    // Resize the canvas depending on ratio
    if (ratio < 1) {
        canvasData.width = imageData.naturalWidth * ratio;
        canvasData.height = imageData.naturalHeight * ratio;
    } else {
        canvasData.width = imageData.naturalWidth;
        canvasData.height = imageData.naturalHeight;
    }

    // Update cropper
    cropper.setCanvasData(canvasData);
}

const positionCanvas = (cropper) => {
    const canvasData = cropper.getCanvasData();
    const containerData = cropper.getContainerData();

    // Center the canvas inside the container
    canvasData.left = (containerData.width - canvasData.width) / 2;
    canvasData.top = (containerData.height - canvasData.height) / 2;

    // Update cropper
    cropper.setCanvasData(canvasData);
}

const newCropper = (image) => {
    return new CropperJS(image, {
        viewMode: 1,
        autoCrop: false,
        wheelZoomRatio: 0.25
    });
}

export default {
    create: (image) => {
        newCropper(image);
    },

    fitCanvas: (cropper) => {
        resizeCanvas(cropper);
        positionCanvas(cropper);
    }
};