const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">لوحة التحكم</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat bg-base-200 rounded-box">
          <div className="stat-title">إجمالي الطلبات</div>
          <div className="stat-value text-primary">—</div>
        </div>
        <div className="stat bg-base-200 rounded-box">
          <div className="stat-title">المؤسسات المانحة</div>
          <div className="stat-value text-primary">—</div>
        </div>
        <div className="stat bg-base-200 rounded-box">
          <div className="stat-title">المستخدمين</div>
          <div className="stat-value text-primary">—</div>
        </div>
        <div className="stat bg-base-200 rounded-box">
          <div className="stat-title">طلبات المطابقة</div>
          <div className="stat-value text-primary">—</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;