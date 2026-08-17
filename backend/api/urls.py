from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .views import (
    RegisterView,
    ProfileView,
    MyTokenObtainPairView,

    DepartmentViewSet,
    DoctorViewSet,
    PatientViewSet,
    AppointmentViewSet,
    MedicineViewSet,
    PrescriptionViewSet,
    PrescriptionMedicineViewSet,
    BillViewSet,
)


# =========================================================
# ROUTER
# =========================================================

router = DefaultRouter()


router.register(
    "departments",
    DepartmentViewSet,
    basename="department"
)


router.register(
    "doctors",
    DoctorViewSet,
    basename="doctor"
)


router.register(
    "patients",
    PatientViewSet,
    basename="patient"
)


router.register(
    "appointments",
    AppointmentViewSet,
    basename="appointment"
)


router.register(
    "medicines",
    MedicineViewSet,
    basename="medicine"
)


router.register(
    "prescriptions",
    PrescriptionViewSet,
    basename="prescription"
)


router.register(
    "prescription-medicines",
    PrescriptionMedicineViewSet,
    basename="prescription-medicine"
)


router.register(
    "bills",
    BillViewSet,
    basename="bill"
)


# =========================================================
# URL PATTERNS
# =========================================================

urlpatterns = [

    # JWT LOGIN
    path(
        "login/",
        MyTokenObtainPairView.as_view(),
        name="login"
    ),

    # REGISTER
    path(
        "register/",
        RegisterView.as_view(),
        name="register"
    ),

    # PROFILE
    path(
        "profile/",
        ProfileView.as_view(),
        name="profile"
    ),

    # ALL API ROUTES
    path(
        "",
        include(router.urls)
    ),
]