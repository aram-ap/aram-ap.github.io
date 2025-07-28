import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FiDroplet, FiCheck } from "react-icons/fi";
import { gradients } from "../utils/gradients";

const SelectorContainer = styled.div`
  background: ${(props) => props.theme.colors.backgroundTertiary};
  border-radius: 8px;
  padding: ${(props) => props.theme.spacing.md};
  margin-top: ${(props) => props.theme.spacing.sm};
`;

const SelectorTitle = styled.h4`
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.sm};
  font-size: ${(props) => props.theme.typography.fontSizes.sm};
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};
`;

const GradientGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: ${(props) => props.theme.spacing.sm};
  margin-top: ${(props) => props.theme.spacing.sm};
`;

const GradientItem = styled(motion.create("div"))`
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid ${(props) => props.$selected ? props.theme.colors.accent : 'transparent'};
  position: relative;
  height: 80px;
  background: ${(props) => props.$gradient};
  
  &:hover {
    border-color: ${(props) => props.theme.colors.accent};
    transform: scale(1.05);
  }
`;

const GradientName = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  font-size: 10px;
  text-align: center;
`;

const SelectedIcon = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  background: ${(props) => props.theme.colors.accent};
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

const PreviewContainer = styled.div`
  margin-top: ${(props) => props.theme.spacing.md};
  padding: ${(props) => props.theme.spacing.sm};
  border-radius: 8px;
  background: ${(props) => props.theme.colors.backgroundSecondary};
`;

const PreviewTitle = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.colors.textSecondary};
  margin-bottom: ${(props) => props.theme.spacing.xs};
`;

const PreviewGradient = styled.div`
  height: 60px;
  border-radius: 6px;
  background: ${(props) => props.$gradient};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      transparent 70%,
      rgba(0, 0, 0, 0.3) 100%
    );
  }
`;

const GradientSelector = ({ selectedGradientId, onGradientSelect }) => {
  const [selectedGradient, setSelectedGradient] = useState(
    gradients.find(g => g.id === selectedGradientId) || gradients[0]
  );

  const handleGradientClick = (gradient) => {
    setSelectedGradient(gradient);
    onGradientSelect(gradient.id);
  };

  return (
    <SelectorContainer>
      <SelectorTitle>
        <FiDroplet style={{ marginRight: '8px' }} />
        Gradient Options
      </SelectorTitle>
      <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
        Choose a gradient to use when no featured image is provided:
      </p>
      
      <GradientGrid>
        {gradients.map((gradient) => (
          <GradientItem
            key={gradient.id}
            $gradient={gradient.value}
            $selected={selectedGradient.id === gradient.id}
            onClick={() => handleGradientClick(gradient)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <GradientName>{gradient.name}</GradientName>
            {selectedGradient.id === gradient.id && (
              <SelectedIcon>
                <FiCheck />
              </SelectedIcon>
            )}
          </GradientItem>
        ))}
      </GradientGrid>
      
      <PreviewContainer>
        <PreviewTitle>Preview (how it will look in your blog post):</PreviewTitle>
        <PreviewGradient $gradient={selectedGradient.value} />
      </PreviewContainer>
    </SelectorContainer>
  );
};

export default GradientSelector; 