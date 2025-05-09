import { Home, Calendar, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

export function Sidebar({ 
  selectedCourse, 
  setSelectedCourse, 
  dateFilter, 
  setDateFilter, 
  courses 
}) {
  return (
    <div className="w-64 border-r flex flex-col p-4">
      <div className="text-xl font-bold mb-8">EduBlog</div>
      
      <nav className="space-y-2">
        <Button 
          variant={selectedCourse === 'all' ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={() => setSelectedCourse('all')}
        >
          <Home className="h-5 w-5 mr-3" />
          <span>Inicio</span>
        </Button>
        
        <Separator className="my-3" />
        
        <div className="pt-2 pb-2">
          <h3 className="text-sm font-semibold text-muted-foreground ml-2">CURSOS</h3>
        </div>
        
        {courses.map(course => (
          <Button 
            key={course.id}
            variant={selectedCourse === course.id ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setSelectedCourse(course.id)}
          >
            {course.icon}
            <span className="ml-3">{course.name}</span>
          </Button>
        ))}
        
        <Separator className="my-3" />
        
        <div className="pt-2 pb-2">
          <h3 className="text-sm font-semibold text-muted-foreground ml-2">FILTRAR POR FECHA</h3>
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{dateFilter === 'all' ? 'Todas las fechas' : 
                        dateFilter === 'today' ? 'Hoy' :
                        dateFilter === 'week' ? 'Esta semana' : 'Este mes'}</span>
              </div>
              <Filter className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56">
            <RadioGroup value={dateFilter} onValueChange={setDateFilter}>
              <div className="flex items-center space-x-2 py-1">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all">Todas las fechas</Label>
              </div>
              <div className="flex items-center space-x-2 py-1">
                <RadioGroupItem value="today" id="today" />
                <Label htmlFor="today">Hoy</Label>
              </div>
              <div className="flex items-center space-x-2 py-1">
                <RadioGroupItem value="week" id="week" />
                <Label htmlFor="week">Esta semana</Label>
              </div>
              <div className="flex items-center space-x-2 py-1">
                <RadioGroupItem value="month" id="month" />
                <Label htmlFor="month">Este mes</Label>
              </div>
            </RadioGroup>
          </PopoverContent>
        </Popover>
      </nav>
    </div>
  );
}