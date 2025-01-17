"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AudioWaveform,
  BadgeCheck,
  Bell,
  BookOpen,
  Bot,
  Building2,
  ChevronRight,
  ChevronsUpDown,
  Command,
  CreditCard,
  Folder,
  Forward,
  Frame,
  GalleryVerticalEnd,
  LogOut,
  Map,
  MoreHorizontal,
  PieChart,
  Plus,
  Settings2,
  Sparkles,
  SquareTerminal,
  Trash2,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

import { ToggleTheme } from "@/components/ToggleTheme";
import Link from "next/link";
import { Company } from "@prisma/client";
import { signOut } from "next-auth/react";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Vender",
      url: "#",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "Mesas",
          url: "sell",
        },
        {
          title: "Para llevar",
          url: "togo",
        },
        {
          title: "Delivery",
          url: "delivery",
        },
      ],
    },
    {
      title: "Ventas",
      url: "#",
      icon: BookOpen,
      isActive: true,
      items:[
        {
          title: "Pedidos",
          url:"orders"
        },
        {
          title:"Ventas...",
          url:"#"
        }
      ]
    },
    {
      title: "Administración",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Productos",
          url: "/products",
        },
        {
          title: "Categorias",
          url: "/categories",
        },
        {
          title: "Tamaños",
          url: "/sizes",
        },
      ],
    },
    {
      title: "Salon",
      url:"#",
      icon: SquareTerminal,
      isActive: true,
      items:[
        {
          title: "Salas",
          url: "/rooms",
        },
        {
          title: "Mesas",
          url: "/tables",
        },
      ]
    },
    {
      title:"Clientes",
      url:"#",
      icon: SquareTerminal,
      isActive: true,
      items:[
        {
          title:"Clientes...",
          url:"#"
        },
        {
          title:"Fidelización...",
          url:"#"
        }
      ]
    },
    {
      title:"Personal",
      url:"#",
      icon: SquareTerminal,
      isActive: true,
      items:[
        {
          title:"Usuarios y Roles...",
          url:"#"
        },
        {
          title:"Turnos y Asistencia...",
          url:"#"
        }
      ]
    },
    {
      title:"Reportes y Análisis",
      url:"#",
      icon: SquareTerminal,
      isActive: true,
      items:[
        {
          title:"Ventas por Día/Mes/Año...",
          url:"#"
        },
        {
          title:"Productos Más Vendidos...",
          url:"#"
        },
        {
          title:"Desempeño del Personal...",
          url:"#"
        }
      ]
    },
    {
      title:"Configuraciones",
      url:"#",
      icon: SquareTerminal,
      isActive: true,
      items:[
        {
          title:"Parametros Generales...",
          url:"#"
        },
        {
          title:"Impresion de Tickets...",
          url:"#"
        },
        {
          title:"Integraciones",
          url:"#"
        }
      ]
    },
    {
      title: "Cocina",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Bandeja",
          url: "#",
        },
      ],
    },
    
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({
  children,
  companySelected,
  userName,
  userEmail,
  // companies,
}: {
  children: React.ReactNode;
  companySelected: Company;
  userName: string | null | undefined;
  userEmail: string;
  // companies: Company[];
}) {
  // const [activeTeam, setActiveTeam] = React.useState(data.teams[0]);
  // console.log("companyId:...", companySelected.id);
  

  const handleClickLogout = async () => {
    await signOut({
      callbackUrl: "/login",
    });
  };

  return (
    <>
      <SidebarProvider>
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      size="lg"
                      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                        {/* <activeTeam.logo className="size-4" /> */}
                        <GalleryVerticalEnd className="size-4" />
                      </div>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {/* {activeTeam.name} */}
                          {companySelected.name}
                          {/* ALZU */}
                        </span>
                        {/* <span className="truncate text-xs">
                          {companySelected.name}
                        </span> */}
                      </div>
                      <ChevronsUpDown className="ml-auto" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                    align="start"
                    side="bottom"
                    sideOffset={4}
                  >
                    {/* <DropdownMenuLabel className="text-xs text-muted-foreground">
                      Teams
                    </DropdownMenuLabel> */}

                    <Link href="/alzu">
                      <DropdownMenuItem className="gap-2 p-2 ">
                        <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                          <Building2 className="size-4" />
                        </div>
                        <div className="font-medium text-muted-foreground">
                          Ver todas las empresas
                        </div>
                      </DropdownMenuItem>
                    </Link>
                      

                      
                        <Link href="/alzu/create">
                          <DropdownMenuItem className="gap-2 p-2">
                            <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                              <Plus className="size-4" />
                            </div>
                            <div className="font-medium text-muted-foreground">
                              Crear una empresa
                            </div>
                          </DropdownMenuItem>
                        </Link>
                        
                      
                    
                    {/* <DropdownMenuSeparator />
                    <DropdownMenuLabel className="text-xs text-muted-foreground">
                      Todas las empresas
                    </DropdownMenuLabel>

                    {companies && companies.map((company, index) => (
                      <Link key={index} href={`/alzu/${company.id}`}>
                      <DropdownMenuItem className="gap-2 p-2">
                        <div className="flex size-6 items-center justify-center rounded-sm border">
                          <GalleryVerticalEnd className="size-4 shrink-0" />
                        </div>
                        {company.name}
                        <DropdownMenuShortcut>
                          ⌘{index + 1}
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                      </Link>
                    ))} */}


                    {/* <DropdownMenuItem className="gap-2 p-2">
                      <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                        <Plus className="size-4" />
                      </div>
                      <div className="font-medium text-muted-foreground">
                        Add team
                      </div>
                    </DropdownMenuItem> */}
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Platform</SidebarGroupLabel>
              <SidebarMenu>
                {data.navMain.map((item) => (
                  <Collapsible
                    key={item.title}
                    asChild
                    defaultOpen={item.isActive}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={item.title}>
                          {item.icon && <item.icon />}
                          <span className="text-lg">{item.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton size="md" asChild>
                                <Link href={`/alzu/${companySelected.id}/${subItem.url}`}>
                                  <span>{subItem.title}</span>
                                </Link>
                                {/* <a href={`/alzu/${companyId}/${subItem.url}`}>
                              <span>{subItem.title}</span>
                            </a> */}
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ))}
              </SidebarMenu>
            </SidebarGroup>
            {/* <SidebarGroup className="group-data-[collapsible=icon]:hidden">
              <SidebarGroupLabel>Mis empresas</SidebarGroupLabel>
              <SidebarMenu>
                {companies.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild>
                      <a >
                        <Frame />
                        <span>{item.name}</span>
                      </a>
                    </SidebarMenuButton>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <SidebarMenuAction showOnHover>
                          <MoreHorizontal />
                          <span className="sr-only">More</span>
                        </SidebarMenuAction>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="w-48 rounded-lg"
                        side="bottom"
                        align="end"
                      >
                        <Link href={`/alzu/${item.id}/update`}>
                          <DropdownMenuItem>
                            <Folder className="text-muted-foreground" />
                            <span>Modificar empresa</span>
                          </DropdownMenuItem>
                        </Link>
                        
                        <DropdownMenuItem>
                          <Forward className="text-muted-foreground" />
                          <span>Share Project</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <Link href={`/alzu/${item.id}/delete`}>
                          <DropdownMenuItem>
                            <Trash2 className="text-muted-foreground" />
                            <span>Borrar Empresa</span>
                          </DropdownMenuItem>
                        
                        </Link>
                        
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                  <SidebarMenuButton className="text-sidebar-foreground/70">
                    <MoreHorizontal className="text-sidebar-foreground/70" />
                    <span>More</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup> */}
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      size="lg"
                      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                          src={data.user.avatar}
                          alt={data.user.name}
                        />
                        <AvatarFallback className="rounded-lg">
                          CN
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {/* {data.user.name} */}
                          {userName}
                        </span>
                        <span className="truncate text-xs">
                          {/* {data.user.email} */}
                          {userEmail}
                        </span>
                      </div>
                      <ChevronsUpDown className="ml-auto size-4" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                    side="bottom"
                    align="end"
                    sideOffset={4}
                  >
                    <DropdownMenuLabel className="p-0 font-normal">
                      <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="h-8 w-8 rounded-lg">
                          <AvatarImage
                            src={data.user.avatar}
                            alt={data.user.name}
                          />
                          <AvatarFallback className="rounded-lg">
                            CN
                          </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                          <span className="truncate font-semibold">
                            {/* {data.user.name} */}
                            {userName}
                          </span>
                          <span className="truncate text-xs">
                            {/* {data.user.email} */}
                            {userEmail}
                          </span>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Sparkles />
                        Actualizar a Pro
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <BadgeCheck />
                        Información
                      </DropdownMenuItem>
                      {/* <DropdownMenuItem>
                        <CreditCard />
                        Billing
                      </DropdownMenuItem> */}
                      <DropdownMenuItem>
                        <Bell />
                        Notificaciones
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={handleClickLogout}>
                      <LogOut />
                      Cerrar sesión
                    </DropdownMenuItem>

                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center justify-between  gap-2 pr-2 gap-x-4 md:pr-6 border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div 
            // className="flex items-center gap-2 px-4" //original
              className="flex items-center gap-2 px-4"
            >
              <SidebarTrigger 
              className="ml-1" 
              />
              <Separator orientation="vertical" className="mr-2 h-8" />
              {/* <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb> */}
            </div>
            <div className="flex gap-x-2 items-center">
              <ToggleTheme />
            </div>
          </header>

          {children}
          {/* <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div> */}
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
