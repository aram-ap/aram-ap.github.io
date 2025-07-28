import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FiImage, FiCopy, FiCheck } from "react-icons/fi";

const HelperContainer = styled.div`
  background: ${(props) => props.theme.colors.backgroundTertiary};
  border-radius: 8px;
  padding: ${(props) => props.theme.spacing.md};
  margin-top: ${(props) => props.theme.spacing.sm};
`;

const HelperTitle = styled.h4`
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.sm};
  font-size: ${(props) => props.theme.typography.fontSizes.sm};
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: ${(props) => props.theme.spacing.sm};
  margin-top: ${(props) => props.theme.spacing.sm};
`;

const ImageItem = styled(motion.div)`
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid ${(props) => props.$selected ? props.theme.colors.accent : 'transparent'};
  position: relative;
  
  &:hover {
    border-color: ${(props) => props.theme.colors.accent};
  }
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 60px;
  object-fit: cover;
  background: #f0f0f0;
  
  &.error {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f0f0f0;
    color: #999;
    font-size: 10px;
  }
`;

const ImageName = styled.div`
  font-size: 10px;
  padding: 4px;
  background: ${(props) => props.theme.colors.backgroundSecondary};
  color: ${(props) => props.theme.colors.textSecondary};
  text-align: center;
  word-break: break-all;
`;

const CopyButton = styled(motion.button)`
  position: absolute;
  top: 2px;
  right: 2px;
  background: ${(props) => props.theme.colors.accent};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 2px 4px;
  font-size: 10px;
  cursor: pointer;
  opacity: 0;
  transition: opacity ${(props) => props.theme.animations.normal};
  
  ${ImageItem}:hover & {
    opacity: 1;
  }
`;

const ClearButton = styled(motion.button)`
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
  margin-top: ${(props) => props.theme.spacing.sm};
  
  &:hover {
    background: #dc2626;
  }
`;

const ImageUploadHelper = ({ onImageSelect }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [copied, setCopied] = useState(false);

  const [availableImages, setAvailableImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to dynamically load images from public/images/blog folder
  const loadImages = async () => {
    try {
      // Use Vite's import.meta.glob to dynamically import all images from public/images/blog
      const imageModules = import.meta.glob('/public/images/blog/*.(jpg|jpeg|png|gif|svg)', { eager: true });
      
      const images = [];
      
      // Process images from public/images/blog directory
      for (const path in imageModules) {
        const name = path.split('/').pop();
        // Use the correct public path for web access
        const publicPath = `/images/blog/${name}`;
        // For public assets, we can use the path directly as the URL
        const imageUrl = publicPath;
        images.push({
          name,
          path: publicPath,
          fullPath: path,
          url: imageUrl
        });
      }
      
      setAvailableImages(images);
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    onImageSelect(image.path);
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    onImageSelect('');
  };

  const copyToClipboard = (path) => {
    navigator.clipboard.writeText(path);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <HelperContainer>
      <HelperTitle>
        <FiImage style={{ marginRight: '8px' }} />
        Available Images
      </HelperTitle>
      <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
        Click an image to select it as your featured image:
      </p>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
          Loading images...
        </div>
      ) : (
        <ImageGrid>
          {availableImages.map((image) => (
            <ImageItem
              key={image.name}
              $selected={selectedImage?.name === image.name}
              onClick={() => handleImageClick(image)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ImagePreview 
                src={image.url} 
                alt={image.name}
                onError={(e) => {
                  e.target.style.display = 'flex';
                  e.target.style.alignItems = 'center';
                  e.target.style.justifyContent = 'center';
                  e.target.style.background = '#f0f0f0';
                  e.target.style.color = '#999';
                  e.target.style.fontSize = '10px';
                  e.target.textContent = 'Error';
                }}
              />
              <ImageName>{image.name}</ImageName>
              <CopyButton
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(image.path);
                }}
                whileHover={{ scale: 1.1 }}
              >
                {copied ? <FiCheck /> : <FiCopy />}
              </CopyButton>
            </ImageItem>
          ))}
        </ImageGrid>
      )}
      
      {selectedImage && (
        <div style={{ marginTop: '12px', fontSize: '12px', color: '#666' }}>
          <strong>Selected:</strong> {selectedImage.path}
          <ClearButton
            onClick={handleClearImage}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Clear Selection
          </ClearButton>
        </div>
      )}
    </HelperContainer>
  );
};

export default ImageUploadHelper; 