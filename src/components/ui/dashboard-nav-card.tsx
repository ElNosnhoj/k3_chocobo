import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DashboardCardProps {
    title: string;
    Icon?: React.ElementType;    // optional
    desc?: string;              // optional
    href?: string;              // optional
}

const DashboardNavCard = ({ title, Icon, desc, href = '#', ...props}: DashboardCardProps) => {
    return (
        <a href={href} className="block h-full" {...props}>
            <Card className="h-full py-4 px-6">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 ">
                    <CardTitle className="text-lg font-medium">{title}</CardTitle>
                    {Icon && <Icon className="h-4 w-4 text-muted-foreground" />} {/* Conditionally render Icon */}
                </CardHeader>
                {desc && ( // Conditionally render CardContent
                    <CardContent className="p-0">
                        <p>{desc}</p>
                    </CardContent>
                )}
            </Card>
        </a>
    )
}

export default DashboardNavCard
