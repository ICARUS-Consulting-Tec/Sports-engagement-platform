// apps/web/src/services/dashboardService.ts

export const dashboardService = {
  // Obtener todas las estadísticas en una sola llamada
  async getDashboardStats() {
    const response = await fetch('http://localhost:4020/api/stats/dashboard');
    if (!response.ok) throw new Error('Error fetching dashboard stats');
    return response.json();
  },

  // O llamadas individuales
  async getMembersPerMonth() {
    const response = await fetch('http://localhost:4020/api/stats/members-per-month');
    if (!response.ok) throw new Error('Error fetching members');
    return response.json();
  },

  async getPostsPerDay() {
    const response = await fetch('http://localhost:4020/api/stats/posts-per-day');
    if (!response.ok) throw new Error('Error fetching posts per day');
    return response.json();
  },

  async getPostsByCategory() {
    const response = await fetch('http://localhost:4020/api/stats/posts-by-category');
    if (!response.ok) throw new Error('Error fetching posts by category');
    return response.json();
  }
};