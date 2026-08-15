from django.utils import timezone

from rest_framework import (
    generics,
    status,
)

from rest_framework.decorators import action

from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
)

from rest_framework.response import Response

from rest_framework.viewsets import ModelViewSet


from .models import (
    Department,
    Doctor,
    Patient,
    Appointment,
    Medicine,
    Prescription,
    PrescriptionMedicine,
    Bill,
)


from .serializers import (
    RegisterSerializer,
    UserSerializer,
    DepartmentSerializer,
    DoctorSerializer,
    PatientSerializer,
    AppointmentSerializer,
    MedicineSerializer,
    PrescriptionSerializer,
    PrescriptionMedicineSerializer,
    BillSerializer,
)


from .permissions import (
    IsAdmin,
    IsDoctor,
    IsPatient,
    IsReceptionist,
    IsAdminOrReceptionist,
    IsAdminOrDoctor,
    IsAdminOrDoctorOrReceptionistOrPatient,
)


# =========================================================
# REGISTER
# =========================================================

class RegisterView(generics.CreateAPIView):

    serializer_class = RegisterSerializer

    permission_classes = [
        AllowAny
    ]


# =========================================================
# PROFILE
# =========================================================

class ProfileView(generics.RetrieveAPIView):

    serializer_class = UserSerializer

    permission_classes = [
        IsAuthenticated
    ]

    def get_object(self):

        return self.request.user


# =========================================================
# DEPARTMENT
# =========================================================

class DepartmentViewSet(ModelViewSet):

    queryset = Department.objects.all()

    serializer_class = DepartmentSerializer

    permission_classes = [
        IsAuthenticated
    ]

    def get_permissions(self):

        if self.request.method in [
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
        ]:

            return [
                IsAdmin()
            ]

        return [
            IsAuthenticated()
        ]


# =========================================================
# DOCTOR
# =========================================================

class DoctorViewSet(ModelViewSet):

    queryset = Doctor.objects.select_related(
        "user",
        "department",
    ).all()

    serializer_class = DoctorSerializer

    permission_classes = [
        IsAuthenticated
    ]

    def get_permissions(self):

        if self.request.method == "GET":

            return [
                IsAuthenticated()
            ]

        return [
            IsAdmin()
        ]


# =========================================================
# PATIENT
# =========================================================

class PatientViewSet(ModelViewSet):

    queryset = Patient.objects.select_related(
        "user",
    ).all()

    serializer_class = PatientSerializer

    permission_classes = [
        IsAuthenticated
    ]

    def get_permissions(self):

        if self.request.method == "GET":

            return [
                IsAuthenticated()
            ]

        return [
            IsAdminOrReceptionist()
        ]


# =========================================================
# APPOINTMENT
# =========================================================

class AppointmentViewSet(ModelViewSet):

    queryset = Appointment.objects.select_related(
        "doctor__user",
        "patient__user",
    ).all()

    serializer_class = AppointmentSerializer

    permission_classes = [
        IsAuthenticated
    ]

    # -----------------------------------------------------
    # FILTER
    # -----------------------------------------------------

    def get_queryset(self):

        queryset = super().get_queryset()

        doctor_id = self.request.query_params.get(
            "doctor"
        )

        patient_id = self.request.query_params.get(
            "patient"
        )

        appointment_date = self.request.query_params.get(
            "date"
        )

        appointment_status = self.request.query_params.get(
            "status"
        )

        if doctor_id:

            queryset = queryset.filter(
                doctor_id=doctor_id
            )

        if patient_id:

            queryset = queryset.filter(
                patient_id=patient_id
            )

        if appointment_date:

            queryset = queryset.filter(
                appointment_date__date=appointment_date
            )

        if appointment_status:

            queryset = queryset.filter(
                status=appointment_status
            )

        return queryset

    # -----------------------------------------------------
    # PERMISSION
    # -----------------------------------------------------

    def get_permissions(self):

        if self.request.method == "GET":

            return [
                IsAuthenticated()
            ]

        return [
            IsAdminOrDoctorOrReceptionistOrPatient()
        ]

    # -----------------------------------------------------
    # CANCEL
    # -----------------------------------------------------

    @action(
        detail=True,
        methods=["post"],
        url_path="cancel"
    )
    def cancel_appointment(
        self,
        request,
        pk=None
    ):

        appointment = self.get_object()

        if appointment.status == "cancelled":

            return Response(
                {
                    "message":
                    "Appointment is already cancelled."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if appointment.status == "completed":

            return Response(
                {
                    "message":
                    "Completed appointment cannot be cancelled."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        appointment.status = "cancelled"

        appointment.save()

        return Response(
            {
                "message":
                "Appointment cancelled successfully.",

                "appointment_id":
                appointment.id,

                "status":
                appointment.status,
            },
            status=status.HTTP_200_OK
        )

    # -----------------------------------------------------
    # COMPLETE
    # -----------------------------------------------------

    @action(
        detail=True,
        methods=["post"],
        url_path="complete"
    )
    def complete_appointment(
        self,
        request,
        pk=None
    ):

        appointment = self.get_object()

        if appointment.status == "cancelled":

            return Response(
                {
                    "message":
                    "Cancelled appointment cannot be completed."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if appointment.status == "completed":

            return Response(
                {
                    "message":
                    "Appointment is already completed."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        appointment.status = "completed"

        appointment.save()

        return Response(
            {
                "message":
                "Appointment completed successfully.",

                "appointment_id":
                appointment.id,

                "status":
                appointment.status,
            },
            status=status.HTTP_200_OK
        )


# =========================================================
# MEDICINE
# =========================================================

class MedicineViewSet(ModelViewSet):

    queryset = Medicine.objects.all()

    serializer_class = MedicineSerializer

    permission_classes = [
        IsAuthenticated
    ]

    def get_queryset(self):

        queryset = super().get_queryset()

        search = self.request.query_params.get(
            "search"
        )

        if search:

            queryset = queryset.filter(
                name__icontains=search
            )

        return queryset

    def get_permissions(self):

        if self.request.method == "GET":

            return [
                IsAuthenticated()
            ]

        return [
            IsAdmin()
        ]


# =========================================================
# PRESCRIPTION
# =========================================================

class PrescriptionViewSet(ModelViewSet):

    queryset = Prescription.objects.select_related(
        "doctor__user",
        "patient__user",
        "appointment",
    ).prefetch_related(
        "medicines__medicine",
    ).all()

    serializer_class = PrescriptionSerializer

    permission_classes = [
        IsAuthenticated
    ]

    def get_permissions(self):

        if self.request.method == "GET":

            return [
                IsAuthenticated()
            ]

        return [
            IsAdminOrDoctor()
        ]


# =========================================================
# PRESCRIPTION MEDICINE
# =========================================================

class PrescriptionMedicineViewSet(ModelViewSet):

    queryset = PrescriptionMedicine.objects.select_related(
        "medicine",
        "prescription",
    ).all()

    serializer_class = PrescriptionMedicineSerializer

    permission_classes = [
        IsAuthenticated
    ]

    def get_permissions(self):

        if self.request.method == "GET":

            return [
                IsAuthenticated()
            ]

        return [
            IsAdminOrDoctor()
        ]


# =========================================================
# BILL
# =========================================================

class BillViewSet(ModelViewSet):

    queryset = Bill.objects.select_related(
        "patient__user",
        "appointment",
    ).all()

    serializer_class = BillSerializer

    permission_classes = [
        IsAuthenticated
    ]

    # -----------------------------------------------------
    # FILTER
    # -----------------------------------------------------

    def get_queryset(self):

        queryset = super().get_queryset()

        patient_id = self.request.query_params.get(
            "patient"
        )

        bill_status = self.request.query_params.get(
            "status"
        )

        if patient_id:

            queryset = queryset.filter(
                patient_id=patient_id
            )

        if bill_status:

            queryset = queryset.filter(
                status=bill_status
            )

        return queryset

    # -----------------------------------------------------
    # PERMISSION
    # -----------------------------------------------------

    def get_permissions(self):

        if self.request.method == "GET":

            return [
                IsAuthenticated()
            ]

        return [
            IsAdminOrReceptionist()
        ]

    # -----------------------------------------------------
    # PAY BILL
    # -----------------------------------------------------

    @action(
        detail=True,
        methods=["post"],
        url_path="pay"
    )
    def pay_bill(
        self,
        request,
        pk=None
    ):

        bill = self.get_object()

        if bill.status == "paid":

            return Response(
                {
                    "message":
                    "Bill is already paid."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        bill.status = "paid"

        bill.paid_at = timezone.now()

        bill.save()

        return Response(
            {
                "message":
                "Bill paid successfully.",

                "bill_id":
                bill.id,

                "status":
                bill.status,

                "paid_at":
                bill.paid_at,
            },
            status=status.HTTP_200_OK
        )