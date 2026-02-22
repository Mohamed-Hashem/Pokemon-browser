import { memo } from "react";

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    children?: React.ReactNode;
}

export default memo(function PageHeader({ title, subtitle, children }: PageHeaderProps) {
    return (
        <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-3 text-gray-800">{title}</h1>
            {subtitle && <p className="text-gray-600 mb-6">{subtitle}</p>}
            {children}
        </div>
    );
});
