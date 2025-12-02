import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Calendar, TrendingUp, MoreVertical, Edit, Flag, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_EMPLOYEE, TOGGLE_EMPLOYEE_FLAG, GET_PAGINATED_EMPLOYEES } from '../graphql/queries';

const GridView = ({ employees, onEmployeeClick, refetch }) => {
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

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      deleteEmployee({ variables: { id } });
    }
  };

  const handleToggleFlag = (id) => {
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
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Employee
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Department
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Position
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Salary
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Attendance
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Joined
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Subjects
            </th>
            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((employee, index) => (
            <motion.tr
              key={employee.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onEmployeeClick(employee)}
              className="hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {employee.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{employee.name}</p>
                    <p className="text-sm text-gray-500">Age: {employee.age}</p>
                  </div>
                  {employee.flagged && (
                    <Flag className="w-4 h-4 text-red-500 fill-red-500" />
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="truncate max-w-[200px]">{employee.email}</span>
                  </div>
                  {employee.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{employee.phone}</span>
                    </div>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm font-medium text-gray-900">{employee.department}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm text-gray-600">{employee.position}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm font-semibold text-gray-900">
                  ${employee.salary.toLocaleString()}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 w-20">
                    <div
                      className={`h-2 rounded-full ${
                        employee.attendance >= 95 ? 'bg-green-500' :
                        employee.attendance >= 90 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${employee.attendance}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{employee.attendance}%</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`badge ${getStatusColor(employee.status)}`}>
                  {employee.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(employee.joiningDate).toLocaleDateString()}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-1 max-w-[200px]">
                  {employee.subjects.slice(0, 2).map((subject, idx) => (
                    <span key={idx} className="badge badge-info text-xs">
                      {subject}
                    </span>
                  ))}
                  {employee.subjects.length > 2 && (
                    <span className="badge badge-info text-xs">
                      +{employee.subjects.length - 2}
                    </span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenu(activeMenu === employee.id ? null : employee.id);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>

                  {activeMenu === employee.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-elegant-lg border border-gray-200 py-2 z-10"
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
                        onClick={() => handleToggleFlag(employee.id)}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Flag className="w-4 h-4" />
                        {employee.flagged ? 'Unflag' : 'Flag'}
                      </button>
                      <button
                        onClick={() => handleDelete(employee.id)}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </motion.div>
                  )}
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GridView;
