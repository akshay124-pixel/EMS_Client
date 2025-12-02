import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { motion } from 'framer-motion';
import { 
  Grid3x3, LayoutGrid, Plus, Filter, Download, 
  RefreshCw, Users, TrendingUp, DollarSign, Activity 
} from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import GridView from '../components/GridView';
import TileView from '../components/TileView';
import EmployeeModal from '../components/EmployeeModal';
import { GET_PAGINATED_EMPLOYEES, GET_EMPLOYEE_STATS } from '../graphql/queries';
import { useUIStore } from '../store/uiStore';

const DashboardPage = () => {
  const { viewMode, setViewMode, setSelectedEmployee } = useUIStore();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { data, loading, error, refetch } = useQuery(GET_PAGINATED_EMPLOYEES, {
    variables: { page, limit },
    fetchPolicy: 'cache-and-network'
  });

  const { data: statsData } = useQuery(GET_EMPLOYEE_STATS);

  const employees = data?.paginatedEmployees?.employees || [];
  const pageInfo = data?.paginatedEmployees?.pageInfo;
  const stats = statsData?.employeeStats;

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
  };

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />

        <main className="flex-1 p-6 overflow-y-auto">
          {/* Stats Cards */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm mb-1">Total Employees</p>
                    <p className="text-3xl font-bold">{stats.totalEmployees}</p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="card bg-gradient-to-br from-green-500 to-green-600 text-white"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm mb-1">Active Employees</p>
                    <p className="text-3xl font-bold">{stats.activeEmployees}</p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <Activity className="w-6 h-6" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm mb-1">Avg. Salary</p>
                    <p className="text-3xl font-bold">${(stats.averageSalary / 1000).toFixed(0)}K</p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm mb-1">Avg. Age</p>
                    <p className="text-3xl font-bold">{stats.averageAge.toFixed(1)}</p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Toolbar */}
          <div className="card mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Employee Management</h1>
                <p className="text-sm text-gray-600">
                  Manage and view all employee information
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* View Toggle */}
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === 'grid'
                        ? 'bg-white shadow-sm text-primary-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Grid3x3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('tile')}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === 'tile'
                        ? 'bg-white shadow-sm text-primary-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <LayoutGrid className="w-5 h-5" />
                  </button>
                </div>

                <button className="btn btn-secondary flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>

                <button
                  onClick={() => refetch()}
                  className="btn btn-secondary flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </button>

                <button className="btn btn-primary flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Employee
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="card">
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              </div>
            )}

            {error && (
              <div className="text-center py-12">
                <p className="text-red-600">Error loading employees: {error.message}</p>
              </div>
            )}

            {!loading && !error && employees.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No employees found</p>
              </div>
            )}

            {!loading && !error && employees.length > 0 && (
              <>
                {viewMode === 'grid' ? (
                  <GridView 
                    employees={employees} 
                    onEmployeeClick={handleEmployeeClick}
                    refetch={refetch}
                  />
                ) : (
                  <TileView 
                    employees={employees} 
                    onEmployeeClick={handleEmployeeClick}
                    refetch={refetch}
                  />
                )}

                {/* Pagination */}
                {pageInfo && pageInfo.totalPages > 1 && (
                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      Page {pageInfo.currentPage} of {pageInfo.totalPages}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPage(page - 1)}
                        disabled={!pageInfo.hasPreviousPage}
                        className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => setPage(page + 1)}
                        disabled={!pageInfo.hasNextPage}
                        className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>

      <EmployeeModal />
    </div>
  );
};

export default DashboardPage;
