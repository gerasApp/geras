import { HelveticaWorld } from "@/app/fonts";
import Card from "@/app/components/Card";
import Link from "next/link";
import {
  ChartBarIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  Cog6ToothIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

export default function Page() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1
            className={`text-4xl font-bold text-[#016384] mb-2 ${HelveticaWorld.className}`}
          >
            ¡Bienvenido a Geras!
          </h1>
          <p className="text-lg text-gray-600">
            Tu plataforma integral para la planificación de tu retiro
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center">
            <div className="text-3xl font-bold text-[#016384] mb-2">0</div>
            <div className="text-gray-600">Planes Activos</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-[#016384] mb-2">$0</div>
            <div className="text-gray-600">Ahorro Total</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-[#016384] mb-2">0%</div>
            <div className="text-gray-600">Progreso del Objetivo</div>
          </Card>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/inicio/plan">
            <Card className="hover:shadow-xl transition-shadow duration-300 cursor-pointer group border-gray-200 hover:border-[#016384]">
              <div className="flex items-center justify-between">
                <div>
                  <ChartBarIcon className="h-8 w-8 text-[#002349] mb-3" />
                  <h3 className="text-lg font-semibold text-[#002349] mb-2">
                    Crear Plan de Retiro
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Diseña tu estrategia de ahorro personalizada
                  </p>
                </div>
                <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-[#016384] transition-colors" />
              </div>
            </Card>
          </Link>

          <Link href="/inicio/planes">
            <Card className="hover:shadow-xl transition-shadow duration-300 cursor-pointer group border-gray-200 hover:border-[#016384]">
              <div className="flex items-center justify-between">
                <div>
                  <DocumentTextIcon className="h-8 w-8 text-[#002349] mb-3" />
                  <h3 className="text-lg font-semibold text-[#002349] mb-2">
                    Ver Planes
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Revisa y gestiona todos tus planes
                  </p>
                </div>
                <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-[#016384] transition-colors" />
              </div>
            </Card>
          </Link>

          <Link href="/inicio/seguimiento">
            <Card className="hover:shadow-xl transition-shadow duration-300 cursor-pointer group border-gray-200 hover:border-[#016384]">
              <div className="flex items-center justify-between">
                <div>
                  <MagnifyingGlassIcon className="h-8 w-8 text-[#002349] mb-3" />
                  <h3 className="text-lg font-semibold text-[#002349] mb-2">
                    Seguimiento
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Monitorea el progreso de tus inversiones
                  </p>
                </div>
                <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-[#016384] transition-colors" />
              </div>
            </Card>
          </Link>

          <Link href="/inicio/configuracion">
            <Card className="hover:shadow-xl transition-shadow duration-300 cursor-pointer group border-gray-200 hover:border-[#016384]">
              <div className="flex items-center justify-between">
                <div>
                  <Cog6ToothIcon className="h-8 w-8 text-[#002349] mb-3" />
                  <h3 className="text-lg font-semibold text-[#002349] mb-2">
                    Configuración
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Personaliza tu experiencia
                  </p>
                </div>
                <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-[#016384] transition-colors" />
              </div>
            </Card>
          </Link>
        </div>

        {/* Getting Started Section */}
        <div className="mt-12">
          <Card className="border-gray-200">
            <h2 className="text-2xl font-bold text-[#016384] mb-4">
              ¿Cómo empezar?
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-[#016384] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-[#002349]">
                    Crea tu primer plan de retiro
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Define tus objetivos financieros y comienza a planificar tu
                    futuro
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-[#016384] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-[#002349]">
                    Configura tu seguimiento
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Agrega tus activos para monitorear el progreso de tus
                    inversiones
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-[#016384] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-[#002349]">
                    Revisa y ajusta regularmente
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Mantén tus planes actualizados según tus cambios de vida
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
