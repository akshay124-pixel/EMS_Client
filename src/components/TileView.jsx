import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, TrendingUp, MoreVertical, Edit, Flag, Trash2, Briefcase } from 'lucide-react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_EMPLOYEE, TOGGLE_EMPLOYEE_FLAG, GET_PAGINATED_EMPLOYEES } from '../graphql/queries';

const TileView = ({ employees, onEmployeeClick, refetch }) => {
  const [activeMenu, setActiveMenu] = useState(null);

  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    refetchQueries: [{ query: GET_PAGINATED_EMPLOYEES, variables: { page: 1, limit: 10 } }],
    onCompleted: () => {
      setActiveMenu(null);
      refetch();
    }
  });

  const [toggleFlag] = useMutation(TOGGLE_EMPLOYEE_FLAG, {
    refetchQueries: [{ query: GET_PAGINATED_EMPLOYEES, variables: { page: 1, limit: 10 } }],
    onCompleted: () => {
      setActiveMenu(null);
      refetch();
    }
  });

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this employee?')) {
      deleteEmployee({ variables: { id } });
    }
  };

  const handleToggleFlag = (id, e) => {
    e.stopPropagation();
    toggleFlag({ variables: { id } });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return 'badge-success';
      case 'ON_LEAVE': return 'badge-warning';
      case 'INACTIVE': return 'badge-danger';
      default: return 'badge-info';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {employees.map((employee, index) => (
        <motion.div
          key={employee.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ y: -5 }}
          onClick={() => onEmployeeClick(employee)}
          className="card card-hover cursor-pointer relative group"
        >
          {/* Flag Indicator */}
          {employee.flagged && (
            <div className="absolute top-4 right-4 z-10">
              <Flag className="w-5 h-5 text-red-500 fill-red-500" />
            </div>
          )}

          {/* Menu Button */}
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveMenu(activeMenu === employee.id ? null : employee.id);
              }}
              className="p-2 bg-white hover:bg-gray-100 rounded-lg shadow-md transition-all opacity-0 group-hover:opacity-100"
            >
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>

            {activeMenu === employee.id && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-elegant-lg border border-gray-200 py-2"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => onEmployeeClick(employee)}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={(e) => handleToggleFlag(employee.id, e)}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Flag className="w-4 h-4" />
                  {employee.flagged ? 'Unflag' : 'Flag'}
                </button>
                <button
                  onClick={(e) => handleDelete(employee.id, e)}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </motion.div>
            )}
          </div>

          {/* Avatar & Name */}
          <div className="flex flex-col items-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-3 shadow-lg">
              {employee.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h3 className="text-lg font-bold text-gray-900 text-center">{employee.name}</h3>
            <p className="text-sm text-gray-500">{employee.position}</p>
            <span className={`badge ${getStatusColor(employee.status)} mt-2`}>
              {employee.status}
            </span>
          </div>

          {/* Info Grid */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Briefcase className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{employee.department}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{employee.email}</span>
            </div>
            {employee.phone && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>{employee.phone}</span>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            <div>
              <p className="text-xs text-gray-500 mb-1">Salary</p>
              <p className="text-sm font-bold text-gray-900">${(employee.salary / 1000).toFixed(0)}K</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Attendance</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      employee.attendance >= 95 ? 'bg-green-500' :
                      employee.attendance >= 90 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${employee.attendance}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-gray-700">{employee.attendance}%</span>
              </div>
            </div>
          </div>

          {/* Subjects */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-2">Skills</p>
            <div className="flex flex-wrap gap-1">
              {employee.subjects.slice(0, 3).map((subject, idx) => (
                <span key={idx} className="badge badge-info text-xs">
                  {subject}
                </span>
              ))}
              {employee.subjects.length > 3 && (
                <span className="badge badge-info text-xs">
                  +{employee.subjects.length - 3}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TileView;
