import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Users, BarChart3, Settings, ChevronDown, 
  FileText, Calendar, Mail, Bell, X 
} from 'lucide-react';
import { useState } from 'react';
import { useUIStore } from '../store/uiStore';

const menuItems = [
  { icon: Home, label: 'Dashboard', active: true },
  { 
    icon: Users, 
    label: 'Employees', 
    submenu: [
      { label: 'All Employees' },
      { label: 'Departments' },
      { label: 'Positions' }
    ]
  },
  { icon: BarChart3, label: 'Analytics' },
  { icon: FileText, label: 'Reports' },
  { icon: Calendar, label: 'Calendar' },
  { icon: Mail, label: 'Messages' },
  { icon: Bell, label: 'Notifications' },
  { icon: Settings, label: 'Settings' },
];

const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen } = useUIStore();
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleSubmenu = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed left-0 top-0 h-screen w-72 bg-white shadow-elegant-xl z-50 lg:relative lg:translate-x-0 lg:h-full lg:shadow-none lg:border-r lg:border-gray-200"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">EMS</h2>
              <p className="text-xs text-gray-500">Management Portal</p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => item.submenu && toggleSubmenu(index)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                      item.active
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {item.submenu && (
                      <motion.div
                        animate={{ rotate: expandedItem === index ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    )}
                  </button>

                  {/* Submenu */}
                  <AnimatePresence>
                    {item.submenu && expandedItem === index && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-4 mt-1 space-y-1 overflow-hidden"
                      >
                        {item.submenu.map((subitem, subIndex) => (
                          <motion.li
                            key={subIndex}
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: subIndex * 0.05 }}
                          >
                            <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
                              {subitem.label}
                            </button>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-4 text-white">
              <p className="text-sm font-semibold mb-1">Need Help?</p>
              <p className="text-xs opacity-90 mb-3">Check our documentation</p>
              <button className="w-full bg-white text-primary-600 text-sm font-medium py-2 rounded-lg hover:bg-gray-100 transition-colors">
                View Docs
              </button>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
