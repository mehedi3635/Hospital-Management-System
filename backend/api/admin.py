from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .models import (
    User,
    Department,
    Doctor,
    Patient,
    Appointment,
    Medicine,
    Prescription,
    PrescriptionMedicine,
    Bill,
)


# =====================================================
# USER ADMIN
# =====================================================

@admin.register(User)
class UserAdmin(BaseUserAdmin):

    list_display = (
        "id",
        "username",
        "email",
        "first_name",
        "last_name",
        "role",
        "phone",
        "is_staff",
        "is_active",
    )

    list_filter = (
        "role",
        "is_staff",
        "is_active",
        "is_superuser",
    )

    search_fields = (
        "username",
        "email",
        "first_name",
        "last_name",
        "phone",
    )

    ordering = ("-id",)

    fieldsets = BaseUserAdmin.fieldsets + (
        (
            "Hospital Information",
            {
                "fields": (
                    "role",
                    "phone",
                )
            },
        ),
    )

    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        (
            "Hospital Information",
            {
                "fields": (
                    "email",
                    "first_name",
                    "last_name",
                    "role",
                    "phone",
                )
            },
        ),
    )


# =====================================================
# DEPARTMENT
# =====================================================

@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "name",
        "description",
    )

    search_fields = (
        "name",
        "description",
    )

    ordering = ("name",)


# =====================================================
# DOCTOR
# =====================================================

@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "user",
        "department",
        "specialization",
        "availability",
        "phone",
    )

    list_filter = (
        "department",
        "availability",
    )

    search_fields = (
        "user__username",
        "user__first_name",
        "user__last_name",
        "specialization",
        "phone",
    )

    ordering = ("-id",)


# =====================================================
# PATIENT
# =====================================================

@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "user",
        "date_of_birth",
        "gender",
        "phone",
    )

    list_filter = (
        "gender",
    )

    search_fields = (
        "user__username",
        "user__first_name",
        "user__last_name",
        "phone",
        "address",
    )

    ordering = ("-id",)


# =====================================================
# APPOINTMENT
# =====================================================

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "doctor",
        "patient",
        "appointment_date",
        "status",
        "created_at",
    )

    list_filter = (
        "status",
    )

    search_fields = (
        "doctor__user__username",
        "patient__user__username",
        "reason",
    )

    ordering = ("-appointment_date",)


# =====================================================
# MEDICINE
# =====================================================

@admin.register(Medicine)
class MedicineAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "name",
        "price",
        "stock",
    )

    search_fields = (
        "name",
        "description",
    )

    ordering = ("name",)


# =====================================================
# PRESCRIPTION
# =====================================================

@admin.register(Prescription)
class PrescriptionAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "doctor",
        "patient",
        "appointment",
        "created_at",
    )

    search_fields = (
        "doctor__user__username",
        "patient__user__username",
        "notes",
    )

    ordering = ("-created_at",)


# =====================================================
# PRESCRIPTION MEDICINE
# =====================================================

@admin.register(PrescriptionMedicine)
class PrescriptionMedicineAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "prescription",
        "medicine",
        "dosage",
        "duration",
    )

    search_fields = (
        "medicine__name",
        "dosage",
        "duration",
    )


# =====================================================
# BILL
# =====================================================

@admin.register(Bill)
class BillAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "patient",
        "appointment",
        "amount",
        "status",
        "created_at",
        "paid_at",
    )

    list_filter = (
        "status",
    )

    search_fields = (
        "patient__user__username",
        "patient__user__first_name",
        "patient__user__last_name",
    )

    ordering = ("-created_at",)