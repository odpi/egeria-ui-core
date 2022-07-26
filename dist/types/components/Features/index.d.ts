import React from 'react';
import { Icon as TablerIcon } from 'tabler-icons-react';
interface FeatureProps {
    icon: TablerIcon;
    title: React.ReactNode;
    description: React.ReactNode;
}
export declare function Feature({ icon: Icon, title, description }: FeatureProps): JSX.Element;
interface FeaturesGridProps {
    data?: FeatureProps[];
}
export declare function FeaturesGrid({ data }: FeaturesGridProps): JSX.Element;
export {};
