import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DashboardCardProps {
    title: string;
    Icon: React.ElementType;
    desc: string;
    href: string;
}

const DashboardNavCard = ({ title, Icon, desc, href }: DashboardCardProps) => {
    return (
        <a href={href} className="block">
            <Card className="h-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-medium">{title}</CardTitle>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <p>{desc}</p>
                </CardContent>
            </Card>
        </a>
    )
}

export default DashboardNavCard