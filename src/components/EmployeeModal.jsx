import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Mail, Phone, MapPin, Calendar, Briefcase, 
  DollarSign, TrendingUp, Award, Clock, Flag 
} from 'lucide-react';
import { useUIStore } from '../store/uiStore';

const EmployeeModal = () => {
  const { selectedEmployee, closeEmployeeModal, showEmployeeModal } = useUIStore();

  if (!selectedEmployee) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'ON_LEAVE': return 'bg-yellow-100 text-yellow-800';
      case 'INACTIVE': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <AnimatePresence>
      {showEmployeeModal && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeEmployeeModal}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-elegant-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="relative bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-12 text-white">
                <button
                  onClick={closeEmployeeModal}
                  className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="flex items-start gap-6">
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-3xl font-bold shadow-lg">
                    {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-3xl font-bold">{selectedEmployee.name}</h2>
                      {selectedEmployee.flagged && (
                        <Flag className="w-6 h-6 fill-white" />
                      )}
                    </div>
                    <p className="text-xl text-white/90 mb-3">{selectedEmployee.position}</p>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedEmployee.status)}`}>
                        {selectedEmployee.status}
                      </span>
                      <span className="text-white/80 text-sm">Age: {selectedEmployee.age}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
                {/* Contact Information */}
                <section className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-primary-600" />
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="text-sm font-medium text-gray-900">{selectedEmployee.email}</p>
                      </div>
                    </div>
                    {selectedEmployee.phone && (
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Phone</p>
                          <p className="text-sm font-medium text-gray-900">{selectedEmployee.phone}</p>
                        </div>
                      </div>
                    )}
                    {selectedEmployee.address && (
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg md:col-span-2">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Address</p>
                          <p className="text-sm font-medium text-gray-900">{selectedEmployee.address}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </section>

                {/* Employment Details */}
                <section className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary-600" />
                    Employment Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="w-5 h-5 text-blue-600" />
                        <p className="text-xs text-blue-600 font-medium">Department</p>
                      </div>
                      <p className="text-lg font-bold text-blue-900">{selectedEmployee.department}</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        <p className="text-xs text-green-600 font-medium">Salary</p>
                      </div>
                      <p className="text-lg font-bold text-green-900">${selectedEmployee.salary.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-5 h-5 text-purple-600" />
                        <p className="text-xs text-purple-600 font-medium">Joined</p>
                      </div>
                      <p className="text-lg font-bold text-purple-900">
                        {new Date(selectedEmployee.joiningDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </section>

                {/* Performance */}
                <section className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary-600" />
                    Performance
                  </h3>
                  <div className="p-6 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-orange-900">Attendance Rate</span>
                      <span className="text-2xl font-bold text-orange-900">{selectedEmployee.attendance}%</span>
                    </div>
                    <div className="w-full bg-orange-200 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedEmployee.attendance}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className={`h-3 rounded-full ${
                          selectedEmployee.attendance >= 95 ? 'bg-green-500' :
                          selectedEmployee.attendance >= 90 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                      />
                    </div>
                  </div>
                </section>

                {/* Skills/Subjects */}
                <section>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary-600" />
                    Skills & Expertise
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedEmployee.subjects.map((subject, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg font-medium text-sm"
                      >
                        {subject}
                      </motion.span>
                    ))}
                  </div>
                </section>
              </div>

              {/* Footer */}
              <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={closeEmployeeModal}
                  className="btn btn-secondary"
                >
                  Close
                </button>
                <button className="btn btn-primary">
                  Edit Employee
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EmployeeModal;
