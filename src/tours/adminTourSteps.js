const adminTourSteps = [
  {
    id: "sidebar",
    page: null,
    target: "#tour-admin-sidebar",
    title: "مرحباً بك في لوحة التحكم",
    content:
      "هذه القائمة الجانبية هي دليلك لجميع أقسام لوحة التحكم الإدارية. يمكنك التنقل بين الأقسام في أي وقت.",
    placement: "left",
  },
  {
    id: "dashboard",
    page: "/admin",
    target: "#tour-admin-dashboard",
    title: "نظرة عامة",
    content:
      "من هنا تتابع أهم المؤشرات: عدد المستخدمين، الحسابات النشطة، المؤسسات المانحة، وطلبات المنح، بالإضافة إلى الرسوم البيانية.",
    placement: "bottom",
  },
  {
    id: "donors",
    page: "/admin/donors",
    target: "#tour-admin-donors",
    title: "المؤسسات المانحة",
    content:
      "إدارة المؤسسات المانحة: ابحث بالاسم، أضف مؤسسة جديدة، وعدّل أو احذف المؤسسات القائمة من الجدول.",
    placement: "bottom",
  },
  {
    id: "requests",
    page: "/admin/requests",
    target: "#tour-admin-requests",
    title: "طلبات المنح",
    content:
      "مراجعة طلبات المنح المقدمة من المستخدمين، مع إمكانية البحث والاطلاع على تفاصيل كل طلب.",
    placement: "bottom",
  },
  {
    id: "users",
    page: "/admin/users",
    target: "#tour-admin-users",
    title: "المستخدمين",
    content:
      "إدارة المستخدمين: البحث، تصفية الأدوار، وتفعيل أو إلغاء تفعيل الحسابات من زر الإجراءات.",
    placement: "bottom",
  },
  {
    id: "profile",
    page: "/admin",
    target: "#tour-admin-navbar",
    title: "الملف الشخصي وتسجيل الخروج",
    content:
      "من أيقونة الحساب في الأعلى يمكنك تعديل ملفك الشخصي أو تسجيل الخروج. هذا كل شيء، استمتع باستخدام النظام!",
    placement: "bottom",
  },
];

export default adminTourSteps;
