import React, { useState, useRef, useEffect } from 'react';
import { Download, Image as ImageIcon, Palette, Type } from 'lucide-react';
import ImageUpload from './ImageUpload';
import TextControls from './TextControls';
import { drawMemeOnCanvas } from '../utils/canvas';

const MemeGenerator = ({ layout = 'horizontal' }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageElement, setImageElement] = useState(null);
  const [topText, setTopText] = useState({
    content: '',
    fontSize: 48,
    color: '#FFFFFF',
    stroke: '#000000',
    strokeWidth: 3,
    y: 15
  });
  const [bottomText, setBottomText] = useState({
    content: '',
    fontSize: 48,
    color: '#FFFFFF',
    stroke: '#000000',
    strokeWidth: 3,
    y: 85
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const canvasRef = useRef(null);
  const previewCanvasRef = useRef(null);

  // Load image when selected
  useEffect(() => {
    if (selectedImage) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        setImageElement(img);
      };
      img.onerror = () => {
        console.error('Failed to load image');
        setImageElement(null);
      };
      img.src = selectedImage;
    }
  }, [selectedImage]);

  // Update preview when image or text changes
  useEffect(() => {
    if (imageElement && previewCanvasRef.current) {
      try {
        drawMemeOnCanvas(previewCanvasRef.current, imageElement, topText, bottomText);
      } catch (error) {
        console.error('Error drawing preview:', error);
      }
    }
  }, [imageElement, topText, bottomText]);

  const handleImageSelect = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleAIMemeGenerated = (imageUrl, aiTopText, aiBottomText) => {
    setSelectedImage(imageUrl);
    if (aiTopText) {
      setTopText(prev => ({ ...prev, content: aiTopText }));
    }
    if (aiBottomText) {
      setBottomText(prev => ({ ...prev, content: aiBottomText }));
    }
  };

  const downloadMeme = async () => {
    if (!imageElement || !canvasRef.current) return;

    setIsGenerating(true);
    try {
      // Use a higher resolution canvas for download
      const downloadCanvas = document.createElement('canvas');
      const ctx = downloadCanvas.getContext('2d');
      
      // Set high resolution
      const scale = 2;
      downloadCanvas.width = imageElement.width * scale;
      downloadCanvas.height = imageElement.height * scale;
      ctx.scale(scale, scale);

      // Draw the meme at high resolution
      drawMemeOnCanvas(downloadCanvas, imageElement, topText, bottomText);

      // Download
      const link = document.createElement('a');
      link.download = `meme-${Date.now()}.png`;
      link.href = downloadCanvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Error downloading meme:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const isHorizontal = layout === 'horizontal';

  return (
    <div className={`${isHorizontal ? 'grid grid-cols-1 lg:grid-cols-2 gap-8' : 'space-y-6'}`}>
      
      {/* Left Panel - Controls */}
      <div className="space-y-6">
        
        {/* Image Upload Section */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Choose Image</h3>
            </div>
          </div>
          <div className="p-4">
            <ImageUpload 
              onImageSelect={handleImageSelect}
              onAIMemeGenerated={handleAIMemeGenerated}
            />
          </div>
        </div>

        {/* Text Controls */}
        {selectedImage && (
          <div className="space-y-4">
            {/* Top Text */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Type className="h-4 w-4 text-green-600" />
                  <h4 className="font-medium text-gray-900 text-sm">Top Text</h4>
                </div>
              </div>
              <div className="p-3">
                <TextControls
                  text={topText}
                  onChange={setTopText}
                  placeholder="Enter top text..."
                />
              </div>
            </div>

            {/* Bottom Text */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Type className="h-4 w-4 text-purple-600" />
                  <h4 className="font-medium text-gray-900 text-sm">Bottom Text</h4>
                </div>
              </div>
              <div className="p-3">
                <TextControls
                  text={bottomText}
                  onChange={setBottomText}
                  placeholder="Enter bottom text..."
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Panel - Preview & Download */}
      <div className="space-y-4">
        
        {/* Preview */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-indigo-600" />
                <h3 className="font-semibold text-gray-900">Preview</h3>
              </div>
              {selectedImage && (
                <button
                  onClick={downloadMeme}
                  disabled={isGenerating}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="h-4 w-4" />
                  {isGenerating ? 'Generating...' : 'Download HD'}
                </button>
              )}
            </div>
          </div>
          
          <div className="p-6">
            {selectedImage ? (
              <div className="relative">
                <canvas
                  ref={previewCanvasRef}
                  className="max-w-full h-auto border border-gray-200 rounded-lg shadow-sm bg-gray-50"
                  style={{ maxHeight: '400px' }}
                />
                <canvas ref={canvasRef} className="hidden" />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <ImageIcon className="h-16 w-16 text-gray-300 mb-4" />
                <p className="text-lg font-medium">No image selected</p>
                <p className="text-sm">Choose an image to start creating your meme</p>
              </div>
            )}
          </div>
        </div>

        {/* Tips */}
        {selectedImage && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-4">
            <h4 className="font-medium text-gray-900 mb-2">💡 Pro Tips</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Use high contrast colors for better readability</li>
              <li>• Keep text short and punchy for maximum impact</li>
              <li>• Adjust font size based on image dimensions</li>
              <li>• Download in HD for social media sharing</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemeGenerator;