import React from "react";
import ContentLoader from "react-content-loader";



const CardSkeleton: React.FC = () => (
  <ContentLoader 
    speed={2}
    width={320}
    height={510}
    viewBox="0 0 320 510"
    backgroundColor="#303030"
    foregroundColor="#4a4a4a"
		style={{margin: '0 auto', display: 'block'}}
  >
    <rect x="0" y="0" rx="12" ry="12" width="320" height="480" /> 
    <rect x="75" y="494" rx="3" ry="3" width="170" height="15" />
  </ContentLoader>
);

export default CardSkeleton;
