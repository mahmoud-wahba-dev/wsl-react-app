import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../utils/api";
import Toast from "../../../public/services/toast";
import ConfirmModal from "../../components/ConfirmModal";

const AdminDonors = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const navigate = useNavigate();

  const getDonors = async () => {
    setLoading(true);
    try {
      const query = searchQuery ? `?search=${searchQuery}` : "";
      const res = await api(`/api/grants/donors/${query}`);
      setDonors(res.data?.results || res.data || []);
    } catch {
      setDonors([]);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeletingId(deleteTarget.id);
    try {
      await api(`/api/grants/donors/${deleteTarget.id}/`, { method: "DELETE" });
      Toast.success("تم حذف المؤسسة");
      setDeleteTarget(null);
      getDonors();
    } catch {
      Toast.error("حدث خطأ أثناء الحذف");
    }
    setDeletingId(null);
  };

  useEffect(() => {
    getDonors();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => getDonors(), searchQuery ? 500 : 0);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-32px font-bold text-[#0D1D2C]">المؤسسات المانحة</h1>
        <Link to="/admin/donors/create" className="btn btn-primary">
          إضافة مؤسسة مانحة
        </Link>
      </div>

      <div className="overflow-x-auto">
        <div className="flex items-center justify-between bg-[#EEF4FF] p-6 rounded-tr-25px rounded-tl-25px">
          <div className="w-[40%]">
            <label className="input">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                type="search"
                placeholder="بحث باسم المؤسسة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </label>
          </div>
        </div>
        <table className="table">
          <thead className="bg-[#DAEAFF]">
            <tr>
              <th className="font-medium text-14px text-[#3E4946] py-6">الشعار</th>
              <th className="font-medium text-14px text-[#3E4946] py-6">الاسم</th>
              <th className="font-medium text-14px text-[#3E4946] py-6">مجالات التمويل</th>
              <th className="font-medium text-14px text-[#3E4946] py-6">الموقع</th>
              <th className="font-medium text-14px text-[#3E4946] py-6">الحالة</th>
              <th className="font-medium text-14px text-[#3E4946] py-6">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-10">
                  <span className="loading loading-spinner loading-lg text-primary"></span>
                </td>
              </tr>
            ) : donors.length > 0 ? (
              donors.map((donor) => (
                <tr key={donor.id}>
                  <td>
                    <div className="avatar">
                      {donor.logo ? (
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={donor.logo} alt={donor.name} />
                        </div>
                      ) : (
                        <div className="mask mask-squircle h-12 w-12 bg-[#0061531A] flex items-center justify-center">
                          <span className="font-bold text-sm text-primary">{donor.name?.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="font-bold text-base text-[#0D1D2C]">{donor.name}</div>
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {donor.funding_areas?.slice(0, 3).map((area, i) => (
                        <span key={i} className="badge badge-soft bg-[#0061531A] text-[#006153] text-11px">
                          {area}
                        </span>
                      ))}
                      {donor.funding_areas?.length > 3 && (
                        <span className="text-11px text-[#3E4946]">+{donor.funding_areas.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="font-normal text-base text-[#3E4946]">
                    {donor.website ? (
                      <a href={donor.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        رابط
                      </a>
                    ) : "—"}
                  </td>
                  <td>
                    <div className={`font-normal text-12px ${donor.is_active ? "text-primary" : "text-error"}`}>
                      {donor.is_active ? "نشط" : "غير نشط"}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/admin/donors/${donor.id}/edit`)}
                        className="btn btn-outline btn-primary btn-sm font-normal text-12px"
                      >
                        تعديل
                      </button>
                      <button
                        onClick={() => setDeleteTarget(donor)}
                        disabled={deletingId === donor.id}
                        className="btn btn-outline btn-error btn-sm font-normal text-12px"
                      >
                        {deletingId === donor.id ? (
                          <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                          "حذف"
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-10 text-gray-500">
                  لا يوجد مؤسسات مانحة
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        open={!!deleteTarget}
        title="حذف المؤسسة المانحة"
        message={deleteTarget ? `هل أنت متأكد من حذف "${deleteTarget.name}"؟` : ""}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deletingId === deleteTarget?.id}
      />
    </div>
  );
};

export default AdminDonors;