from rest_framework import serializers

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
# USER
# =====================================================

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "role",
            "phone",
        ]


# =====================================================
# REGISTER
# =====================================================

class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        min_length=6
    )

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "password",
            "first_name",
            "last_name",
            "role",
            "phone",
        ]

    def create(self, validated_data):

        password = validated_data.pop("password")

        user = User.objects.create_user(
            password=password,
            **validated_data
        )

        return user


# =====================================================
# DEPARTMENT
# =====================================================

class DepartmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Department
        fields = "__all__"


# =====================================================
# DOCTOR
# =====================================================

class DoctorSerializer(serializers.ModelSerializer):

    user = UserSerializer(read_only=True)

    class Meta:
        model = Doctor
        fields = "__all__"


# =====================================================
# PATIENT
# =====================================================

class PatientSerializer(serializers.ModelSerializer):

    user = UserSerializer(read_only=True)

    class Meta:
        model = Patient
        fields = "__all__"


# =====================================================
# APPOINTMENT
# =====================================================

class AppointmentSerializer(serializers.ModelSerializer):

    doctor_name = serializers.CharField(
        source="doctor.user.get_full_name",
        read_only=True
    )

    patient_name = serializers.CharField(
        source="patient.user.get_full_name",
        read_only=True
    )

    class Meta:
        model = Appointment

        fields = [
            "id",
            "doctor",
            "doctor_name",
            "patient",
            "patient_name",
            "appointment_date",
            "reason",
            "status",
            "created_at",
        ]

        read_only_fields = [
            "created_at",
        ]


# =====================================================
# MEDICINE
# =====================================================

class MedicineSerializer(serializers.ModelSerializer):

    class Meta:
        model = Medicine
        fields = "__all__"


# =====================================================
# PRESCRIPTION MEDICINE
# =====================================================

class PrescriptionMedicineSerializer(serializers.ModelSerializer):

    medicine_name = serializers.CharField(
        source="medicine.name",
        read_only=True
    )

    class Meta:
        model = PrescriptionMedicine

        fields = [
            "id",
            "prescription",
            "medicine",
            "medicine_name",
            "dosage",
            "duration",
            "instructions",
        ]


# =====================================================
# PRESCRIPTION
# =====================================================

class PrescriptionSerializer(serializers.ModelSerializer):

    medicines = PrescriptionMedicineSerializer(
        many=True,
        read_only=True
    )

    doctor_name = serializers.CharField(
        source="doctor.user.get_full_name",
        read_only=True
    )

    patient_name = serializers.CharField(
        source="patient.user.get_full_name",
        read_only=True
    )

    class Meta:
        model = Prescription

        fields = [
            "id",
            "doctor",
            "doctor_name",
            "patient",
            "patient_name",
            "appointment",
            "notes",
            "medicines",
            "created_at",
        ]

        read_only_fields = [
            "created_at",
        ]


# =====================================================
# BILL
# =====================================================

class BillSerializer(serializers.ModelSerializer):

    patient_name = serializers.CharField(
        source="patient.user.get_full_name",
        read_only=True
    )

    class Meta:
        model = Bill

        fields = [
            "id",
            "patient",
            "patient_name",
            "appointment",
            "amount",
            "status",
            "created_at",
            "paid_at",
        ]

        read_only_fields = [
            "created_at",
            "paid_at",
        ]