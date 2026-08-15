from rest_framework.permissions import BasePermission


# =========================================================
# ADMIN
# =========================================================

class IsAdmin(BasePermission):

    def has_permission(self, request, view):

        return (
            request.user.is_authenticated
            and (
                request.user.is_superuser
                or request.user.role == "admin"
            )
        )


# =========================================================
# DOCTOR
# =========================================================

class IsDoctor(BasePermission):

    def has_permission(self, request, view):

        return (
            request.user.is_authenticated
            and request.user.role == "doctor"
        )


# =========================================================
# PATIENT
# =========================================================

class IsPatient(BasePermission):

    def has_permission(self, request, view):

        return (
            request.user.is_authenticated
            and request.user.role == "patient"
        )


# =========================================================
# RECEPTIONIST
# =========================================================

class IsReceptionist(BasePermission):

    def has_permission(self, request, view):

        return (
            request.user.is_authenticated
            and request.user.role == "receptionist"
        )


# =========================================================
# ADMIN OR RECEPTIONIST
# =========================================================

class IsAdminOrReceptionist(BasePermission):

    def has_permission(self, request, view):

        return (
            request.user.is_authenticated
            and (
                request.user.is_superuser
                or request.user.role in [
                    "admin",
                    "receptionist",
                ]
            )
        )


# =========================================================
# ADMIN OR DOCTOR
# =========================================================

class IsAdminOrDoctor(BasePermission):

    def has_permission(self, request, view):

        return (
            request.user.is_authenticated
            and (
                request.user.is_superuser
                or request.user.role in [
                    "admin",
                    "doctor",
                ]
            )
        )


# =========================================================
# ADMIN OR DOCTOR OR RECEPTIONIST OR PATIENT
# =========================================================

class IsAdminOrDoctorOrReceptionistOrPatient(BasePermission):

    def has_permission(self, request, view):

        return (
            request.user.is_authenticated
            and (
                request.user.is_superuser
                or request.user.role in [
                    "admin",
                    "doctor",
                    "receptionist",
                    "patient",
                ]
            )
        )