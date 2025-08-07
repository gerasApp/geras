import { HelveticaWorld } from "@/app/fonts";
import Card from "@/app/components/Card";
import {
  UserIcon,
  BellIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import Button from "@/app/components/Button";

export default function Page() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1
            className={`text-4xl font-bold text-[#016384] mb-2 ${HelveticaWorld.className}`}
          >
            Configuración
          </h1>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Profile Settings */}
          <Card className="border-gray-200">
            <div className="flex items-center mb-4">
              <UserIcon className="h-6 w-6 text-[#002349] mr-3" />
              <h2 className="text-xl font-semibold text-[#002349]">
                Perfil de Usuario
              </h2>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    placeholder="Tu nombre completo"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#016384] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#016384] focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha de nacimiento
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#016384] focus:border-transparent"
                />
              </div>
            </div>
          </Card>

          {/* Notification Settings */}
          <Card className="border-gray-200">
            <div className="flex items-center mb-4">
              <BellIcon className="h-6 w-6 text-[#002349] mr-3" />
              <h2 className="text-xl font-semibold text-[#002349]">
                Notificaciones
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-700">
                    Notificaciones por email
                  </h3>
                  <p className="text-sm text-gray-600">
                    Recibe actualizaciones importantes por correo
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#016384] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#016384]"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-700">
                    Recordatorios de seguimiento
                  </h3>
                  <p className="text-sm text-gray-600">
                    Recibe recordatorios para actualizar tus activos
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#016384] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#016384]"></div>
                </label>
              </div>
            </div>
          </Card>

          {/* Security Settings */}
          <Card className="border-gray-200">
            <div className="flex items-center mb-4">
              <ShieldCheckIcon className="h-6 w-6 text-[#002349] mr-3" />
              <h2 className="text-xl font-semibold text-[#002349]">
                Seguridad
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña actual
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#016384] focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nueva contraseña
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#016384] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmar nueva contraseña
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#016384] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Preferences */}
          <Card className="border-gray-200">
            <div className="flex items-center mb-4">
              <Cog6ToothIcon className="h-6 w-6 text-[#002349] mr-3" />
              <h2 className="text-xl font-semibold text-[#002349]">
                Preferencias
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Moneda predeterminada
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#016384] focus:border-transparent">
                  <option value="USD">Dólar estadounidense (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                  <option value="GBP">Libra esterlina (GBP)</option>
                  <option value="JPY">Yen japonés (JPY)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Idioma
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#016384] focus:border-transparent">
                  <option value="es">Español</option>
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-700">Modo oscuro</h3>
                  <p className="text-sm text-gray-600">
                    Cambiar entre tema claro y oscuro
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#016384] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#016384]"></div>
                </label>
              </div>
            </div>
          </Card>

          {/* Data & Privacy */}
          <Card className="border-gray-200">
            <div className="flex items-center mb-4">
              <DocumentTextIcon className="h-6 w-6 text-[#002349] mr-3" />
              <h2 className="text-xl font-semibold text-[#002349]">
                Datos y Privacidad
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-700">Eliminar cuenta</h3>
                  <p className="text-sm text-gray-600">
                    Elimina permanentemente tu cuenta y todos los datos
                  </p>
                </div>
                <Button className="bg-red">Eliminar</Button>
              </div>
            </div>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end pt-6">
            <Button variant="default">Guardar Cambios</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
