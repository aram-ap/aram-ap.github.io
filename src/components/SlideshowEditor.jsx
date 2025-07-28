import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FiPlus, FiEdit, FiTrash2, FiEye, FiEyeOff, FiMove, FiImage, FiType } from "react-icons/fi";
import ImageUploadHelper from "./ImageUploadHelper";

const SlideshowEditorContainer = styled.div`
  background: ${(props) => props.theme.colors.backgroundTertiary};
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: 12px;
  padding: ${(props) => props.theme.spacing.lg};
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

const SlideshowHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

const SlideshowTitle = styled.h4`
  color: ${(props) => props.theme.colors.text};
  margin: 0;
  font-size: ${(props) => props.theme.typography.fontSizes.lg};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
`;

const SlideshowControls = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.sm};
`;

const ControlButton = styled(motion.button)`
  padding: ${(props) => props.theme.spacing.xs} ${(props) => props.theme.spacing.sm};
  background: ${(props) => props.$variant === 'danger' ? '#dc2626' : props.theme.colors.accent};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: ${(props) => props.theme.typography.fontSizes.sm};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};

  &:hover {
    background: ${(props) => props.$variant === 'danger' ? '#b91c1c' : props.theme.colors.accentDark};
  }
`;

const SlideshowForm = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${(props) => props.theme.spacing.lg};
  margin-bottom: ${(props) => props.theme.spacing.lg};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${(props) => props.theme.spacing.xs};
  color: ${(props) => props.theme.colors.text};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
  font-size: ${(props) => props.theme.typography.fontSizes.sm};
`;

const Input = styled.input`
  width: 100%;
  padding: ${(props) => props.theme.spacing.sm};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 6px;
  background: ${(props) => props.theme.colors.backgroundSecondary};
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.typography.fontSizes.sm};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.accent};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: ${(props) => props.theme.spacing.sm};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 6px;
  background: ${(props) => props.theme.colors.backgroundSecondary};
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.typography.fontSizes.sm};
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.accent};
  }
`;

const SlidesList = styled.div`
  margin-top: ${(props) => props.theme.spacing.lg};
`;

const SlideItem = styled(motion.div)`
  background: ${(props) => props.theme.colors.backgroundSecondary};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  padding: ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.sm};
  cursor: pointer;
  transition: all ${(props) => props.theme.animations.normal};

  &:hover {
    border-color: ${(props) => props.theme.colors.accent};
    transform: translateY(-2px);
  }

  ${(props) => props.$isActive && `
    border-color: ${props.theme.colors.accent};
    background: ${props.theme.colors.backgroundTertiary};
  `}
`;

const SlideHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.sm};
`;

const SlideTitle = styled.h5`
  color: ${(props) => props.theme.colors.text};
  margin: 0;
  font-size: ${(props) => props.theme.typography.fontSizes.md};
  font-weight: ${(props) => props.theme.typography.fontWeights.medium};
`;

const SlideControls = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.xs};
`;

const SlidePreview = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.sm};
  align-items: center;
`;

const SlideImagePreview = styled.div`
  width: 60px;
  height: 40px;
  border-radius: 4px;
  overflow: hidden;
  background: ${(props) => props.theme.colors.backgroundTertiary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.theme.typography.fontSizes.xs};
  color: ${(props) => props.theme.colors.textSecondary};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const SlideContentPreview = styled.div`
  flex: 1;
  font-size: ${(props) => props.theme.typography.fontSizes.xs};
  color: ${(props) => props.theme.colors.textSecondary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const AddSlideButton = styled(motion.button)`
  width: 100%;
  padding: ${(props) => props.theme.spacing.md};
  background: transparent;
  border: 2px dashed ${(props) => props.theme.colors.border};
  border-radius: 8px;
  color: ${(props) => props.theme.colors.textSecondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.sm};
  transition: all ${(props) => props.theme.animations.normal};

  &:hover {
    border-color: ${(props) => props.theme.colors.accent};
    color: ${(props) => props.theme.colors.accent};
  }
`;

const SlideshowEditor = ({ 
  slideshow, 
  onSlideshowChange, 
  onDelete 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [editingSlide, setEditingSlide] = useState(null);
  const [slideForm, setSlideForm] = useState({
    image: "",
    imageTitle: "",
    imageCaption: "",
    content: {
      title: "",
      description: "",
      points: [""]
    }
  });

  const handleSlideFormChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setSlideForm(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setSlideForm(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleContentPointChange = (index, value) => {
    setSlideForm(prev => ({
      ...prev,
      content: {
        ...prev.content,
        points: prev.content.points.map((point, i) => 
          i === index ? value : point
        )
      }
    }));
  };

  const addContentPoint = () => {
    setSlideForm(prev => ({
      ...prev,
      content: {
        ...prev.content,
        points: [...prev.content.points, ""]
      }
    }));
  };

  const removeContentPoint = (index) => {
    setSlideForm(prev => ({
      ...prev,
      content: {
        ...prev.content,
        points: prev.content.points.filter((_, i) => i !== index)
      }
    }));
  };

  const handleAddSlide = () => {
    if (!slideForm.image || !slideForm.content.title) {
      alert("Please provide an image and content title for the slide.");
      return;
    }

    const newSlide = {
      ...slideForm,
      content: {
        ...slideForm.content,
        points: slideForm.content.points.filter(point => point.trim() !== "")
      }
    };

    const updatedSlideshow = {
      ...slideshow,
      slides: [...slideshow.slides, newSlide]
    };

    onSlideshowChange(updatedSlideshow);
    
    // Reset form
    setSlideForm({
      image: "",
      imageTitle: "",
      imageCaption: "",
      content: {
        title: "",
        description: "",
        points: [""]
      }
    });
  };

  const handleEditSlide = (slideIndex) => {
    const slide = slideshow.slides[slideIndex];
    setSlideForm({
      image: slide.image || "",
      imageTitle: slide.imageTitle || "",
      imageCaption: slide.imageCaption || "",
      content: {
        title: slide.content?.title || "",
        description: slide.content?.description || "",
        points: slide.content?.points?.length > 0 ? slide.content.points : [""]
      }
    });
    setEditingSlide(slideIndex);
  };

  const handleUpdateSlide = () => {
    if (!slideForm.image || !slideForm.content.title) {
      alert("Please provide an image and content title for the slide.");
      return;
    }

    const updatedSlide = {
      ...slideForm,
      content: {
        ...slideForm.content,
        points: slideForm.content.points.filter(point => point.trim() !== "")
      }
    };

    const updatedSlideshow = {
      ...slideshow,
      slides: slideshow.slides.map((slide, index) => 
        index === editingSlide ? updatedSlide : slide
      )
    };

    onSlideshowChange(updatedSlideshow);
    setEditingSlide(null);
    
    // Reset form
    setSlideForm({
      image: "",
      imageTitle: "",
      imageCaption: "",
      content: {
        title: "",
        description: "",
        points: [""]
      }
    });
  };

  const handleDeleteSlide = (slideIndex) => {
    if (window.confirm("Are you sure you want to delete this slide?")) {
      const updatedSlideshow = {
        ...slideshow,
        slides: slideshow.slides.filter((_, index) => index !== slideIndex)
      };
      onSlideshowChange(updatedSlideshow);
    }
  };

  const handleImageSelect = (imagePath) => {
    handleSlideFormChange('image', imagePath);
  };

  return (
    <SlideshowEditorContainer>
      <SlideshowHeader>
        <SlideshowTitle>
          <FiImage style={{ marginRight: '8px' }} />
          Slideshow: {slideshow.title || slideshow.id}
        </SlideshowTitle>
        <SlideshowControls>
          <ControlButton
            onClick={() => setIsExpanded(!isExpanded)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isExpanded ? <FiEyeOff /> : <FiEye />}
            {isExpanded ? 'Collapse' : 'Expand'}
          </ControlButton>
          <ControlButton
            $variant="danger"
            onClick={onDelete}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiTrash2 />
            Delete
          </ControlButton>
        </SlideshowControls>
      </SlideshowHeader>

      {isExpanded && (
        <>
          <SlideshowForm>
            <div>
              <FormGroup>
                <Label>Image Path *</Label>
                <Input
                  type="text"
                  value={slideForm.image}
                  onChange={(e) => handleSlideFormChange('image', e.target.value)}
                  placeholder="/images/blog/my-image.jpg"
                />
                <ImageUploadHelper onImageSelect={handleImageSelect} />
              </FormGroup>

              <FormGroup>
                <Label>Image Title</Label>
                <Input
                  type="text"
                  value={slideForm.imageTitle}
                  onChange={(e) => handleSlideFormChange('imageTitle', e.target.value)}
                  placeholder="Optional image title"
                />
              </FormGroup>

              <FormGroup>
                <Label>Image Caption</Label>
                <Input
                  type="text"
                  value={slideForm.imageCaption}
                  onChange={(e) => handleSlideFormChange('imageCaption', e.target.value)}
                  placeholder="Optional image caption"
                />
              </FormGroup>
            </div>

            <div>
              <FormGroup>
                <Label>Content Title *</Label>
                <Input
                  type="text"
                  value={slideForm.content.title}
                  onChange={(e) => handleSlideFormChange('content.title', e.target.value)}
                  placeholder="Slide content title"
                />
              </FormGroup>

              <FormGroup>
                <Label>Content Description</Label>
                <TextArea
                  value={slideForm.content.description}
                  onChange={(e) => handleSlideFormChange('content.description', e.target.value)}
                  placeholder="Detailed description of the slide content"
                />
              </FormGroup>

              <FormGroup>
                <Label>Content Points</Label>
                {slideForm.content.points.map((point, index) => (
                  <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <Input
                      type="text"
                      value={point}
                      onChange={(e) => handleContentPointChange(index, e.target.value)}
                      placeholder={`Point ${index + 1}`}
                    />
                    <ControlButton
                      $variant="danger"
                      onClick={() => removeContentPoint(index)}
                      style={{ padding: '4px 8px' }}
                    >
                      <FiTrash2 />
                    </ControlButton>
                  </div>
                ))}
                <ControlButton
                  onClick={addContentPoint}
                  style={{ padding: '4px 8px' }}
                >
                  <FiPlus />
                  Add Point
                </ControlButton>
              </FormGroup>
            </div>
          </SlideshowForm>

          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            {editingSlide !== null ? (
              <ControlButton
                onClick={handleUpdateSlide}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiEdit />
                Update Slide
              </ControlButton>
            ) : (
              <ControlButton
                onClick={handleAddSlide}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiPlus />
                Add Slide
              </ControlButton>
            )}
          </div>

          <SlidesList>
            <Label>Slides ({slideshow.slides.length})</Label>
            {slideshow.slides.map((slide, index) => (
              <SlideItem
                key={index}
                $isActive={editingSlide === index}
                onClick={() => handleEditSlide(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <SlideHeader>
                  <SlideTitle>
                    Slide {index + 1}: {slide.content?.title || 'Untitled'}
                  </SlideTitle>
                  <SlideControls>
                    <ControlButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditSlide(index);
                      }}
                      style={{ padding: '4px 8px' }}
                    >
                      <FiEdit />
                    </ControlButton>
                    <ControlButton
                      $variant="danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSlide(index);
                      }}
                      style={{ padding: '4px 8px' }}
                    >
                      <FiTrash2 />
                    </ControlButton>
                  </SlideControls>
                </SlideHeader>
                <SlidePreview>
                  <SlideImagePreview>
                    {slide.image ? (
                      <img src={slide.image} alt={slide.imageTitle || 'Slide'} />
                    ) : (
                      'No Image'
                    )}
                  </SlideImagePreview>
                  <SlideContentPreview>
                    {slide.content?.description || 'No description'}
                  </SlideContentPreview>
                </SlidePreview>
              </SlideItem>
            ))}
          </SlidesList>
        </>
      )}
    </SlideshowEditorContainer>
  );
};

export default SlideshowEditor; 