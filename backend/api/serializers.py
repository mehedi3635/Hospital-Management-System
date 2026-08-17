from django.contrib.auth import get_user_model

from rest_framework import serializers

from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer
)

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


User = get_user_model()


# =========================================================
# USER SERIALIZER
# =========================================================

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

        read_only_fields = [
            "id",
        ]


# =========================================================
# USER BASIC SERIALIZER
# =========================================================

class UserBasicSerializer(serializers.ModelSerializer):

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

        read_only_fields = [
            "id",
        ]


# =========================================================
# REGISTER SERIALIZER
# =========================================================

class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        min_length=6
    )

    class Meta:

        model = User

        fields = [
            "username",
            "password",
            "email",
            "first_name",
            "last_name",
            "role",
            "phone",
        ]

        extra_kwargs = {

            "email": {
                "required": False,
                "allow_blank": True,
            },

            "first_name": {
                "required": False,
                "allow_blank": True,
            },

            "last_name": {
                "required": False,
                "allow_blank": True,
            },

            "role": {
                "required": False,
            },

            "phone": {
                "required": False,
                "allow_blank": True,
            },
        }


    def create(self, validated_data):

        password = validated_data.pop(
            "password"
        )

        user = User.objects.create_user(
            password=password,
            **validated_data
        )

        return user


# =========================================================
# JWT TOKEN SERIALIZER
# =========================================================

class MyTokenObtainPairSerializer(
    TokenObtainPairSerializer
):

    @classmethod
    def get_token(cls, user):

        token = super().get_token(user)

        token["username"] = user.username

        token["role"] = user.role

        token["email"] = user.email

        return token


    def validate(self, attrs):

        data = super().validate(attrs)

        data["user"] = {

            "id": self.user.id,

            "username": self.user.username,

            "role": self.user.role,

            "email": self.user.email,

            "first_name": self.user.first_name,

            "last_name": self.user.last_name,

        }

        return data


# =========================================================
# DEPARTMENT SERIALIZER
# =========================================================

class DepartmentSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = Department

        fields = [
            "id",
            "name",
            "description",
        ]

        read_only_fields = [
            "id",
        ]


# =========================================================
# DOCTOR SERIALIZER
# =========================================================

class DoctorSerializer(
    serializers.ModelSerializer
):

    username = serializers.CharField(
        write_only=True
    )

    password = serializers.CharField(
        write_only=True,
        min_length=6
    )

    email = serializers.EmailField(
        write_only=True,
        required=False,
        allow_blank=True
    )

    first_name = serializers.CharField(
        write_only=True
    )

    last_name = serializers.CharField(
        write_only=True,
        required=False,
        allow_blank=True
    )

    user_name = serializers.CharField(
        source="user.username",
        read_only=True
    )

    user_email = serializers.EmailField(
        source="user.email",
        read_only=True
    )

    user_first_name = serializers.CharField(
        source="user.first_name",
        read_only=True
    )

    user_last_name = serializers.CharField(
        source="user.last_name",
        read_only=True
    )

    department_name = serializers.CharField(
        source="department.name",
        read_only=True
    )


    class Meta:

        model = Doctor

        fields = [

            "id",

            "user",

            "username",
            "password",
            "email",
            "first_name",
            "last_name",

            "user_name",
            "user_email",
            "user_first_name",
            "user_last_name",

            "department",
            "department_name",

            "specialization",

            "availability",

            "phone",
        ]

        read_only_fields = [

            "id",
            "user",

            "user_name",
            "user_email",
            "user_first_name",
            "user_last_name",

            "department_name",
        ]


    def create(self, validated_data):

        username = validated_data.pop(
            "username"
        )

        password = validated_data.pop(
            "password"
        )

        email = validated_data.pop(
            "email",
            ""
        )

        first_name = validated_data.pop(
            "first_name"
        )

        last_name = validated_data.pop(
            "last_name",
            ""
        )


        if User.objects.filter(
            username=username
        ).exists():

            raise serializers.ValidationError({

                "username":
                    "This username already exists."

            })


        user = User.objects.create_user(

            username=username,

            password=password,

            email=email,

            first_name=first_name,

            last_name=last_name,

            role="doctor",

        )


        doctor = Doctor.objects.create(

            user=user,

            **validated_data

        )


        return doctor


# =========================================================
# PATIENT SERIALIZER
# =========================================================

class PatientSerializer(
    serializers.ModelSerializer
):

    username = serializers.CharField(
        write_only=True
    )

    password = serializers.CharField(
        write_only=True,
        min_length=6
    )

    email = serializers.EmailField(
        write_only=True,
        required=False,
        allow_blank=True
    )

    first_name = serializers.CharField(
        write_only=True
    )

    last_name = serializers.CharField(
        write_only=True,
        required=False,
        allow_blank=True
    )

    user_name = serializers.CharField(
        source="user.username",
        read_only=True
    )

    user_email = serializers.EmailField(
        source="user.email",
        read_only=True
    )

    user_first_name = serializers.CharField(
        source="user.first_name",
        read_only=True
    )

    user_last_name = serializers.CharField(
        source="user.last_name",
        read_only=True
    )


    class Meta:

        model = Patient

        fields = [

            "id",

            "user",

            "username",
            "password",
            "email",
            "first_name",
            "last_name",

            "user_name",
            "user_email",
            "user_first_name",
            "user_last_name",

            "date_of_birth",
            "gender",
            "address",
            "phone",
        ]

        read_only_fields = [

            "id",
            "user",

            "user_name",
            "user_email",
            "user_first_name",
            "user_last_name",
        ]


    def create(self, validated_data):

        username = validated_data.pop(
            "username"
        )

        password = validated_data.pop(
            "password"
        )

        email = validated_data.pop(
            "email",
            ""
        )

        first_name = validated_data.pop(
            "first_name"
        )

        last_name = validated_data.pop(
            "last_name",
            ""
        )


        if User.objects.filter(
            username=username
        ).exists():

            raise serializers.ValidationError({

                "username":
                    "This username already exists."

            })


        user = User.objects.create_user(

            username=username,

            password=password,

            email=email,

            first_name=first_name,

            last_name=last_name,

            role="patient",

        )


        patient = Patient.objects.create(

            user=user,

            **validated_data

        )


        return patient


# =========================================================
# APPOINTMENT SERIALIZER
# =========================================================

class AppointmentSerializer(
    serializers.ModelSerializer
):

    doctor_name = serializers.SerializerMethodField()

    patient_name = serializers.SerializerMethodField()

    doctor_username = serializers.CharField(
        source="doctor.user.username",
        read_only=True
    )

    patient_username = serializers.CharField(
        source="patient.user.username",
        read_only=True
    )


    class Meta:

        model = Appointment

        fields = [

            "id",

            "doctor",
            "doctor_name",
            "doctor_username",

            "patient",
            "patient_name",
            "patient_username",

            "appointment_date",

            "reason",

            "status",

            "created_at",
        ]

        read_only_fields = [

            "id",
            "doctor_name",
            "doctor_username",
            "patient_name",
            "patient_username",
            "created_at",
        ]


    def get_doctor_name(self, obj):

        return (
            obj.doctor.user.get_full_name()
            or obj.doctor.user.username
        )


    def get_patient_name(self, obj):

        return (
            obj.patient.user.get_full_name()
            or obj.patient.user.username
        )


# =========================================================
# MEDICINE SERIALIZER
# =========================================================

class MedicineSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = Medicine

        fields = [
            "id",
            "name",
            "description",
            "price",
            "stock",
        ]

        read_only_fields = [
            "id",
        ]


# =========================================================
# PRESCRIPTION MEDICINE SERIALIZER
# =========================================================

class PrescriptionMedicineSerializer(
    serializers.ModelSerializer
):

    medicine_name = serializers.CharField(
        source="medicine.name",
        read_only=True
    )

    medicine_price = serializers.DecimalField(
        source="medicine.price",
        max_digits=10,
        decimal_places=2,
        read_only=True
    )


    class Meta:

        model = PrescriptionMedicine

        fields = [

            "id",

            "prescription",

            "medicine",
            "medicine_name",
            "medicine_price",

            "dosage",

            "duration",

            "instructions",
        ]

        read_only_fields = [

            "id",
            "medicine_name",
            "medicine_price",
        ]


# =========================================================
# PRESCRIPTION SERIALIZER
# =========================================================

class PrescriptionSerializer(
    serializers.ModelSerializer
):

    doctor_name = serializers.SerializerMethodField()

    patient_name = serializers.SerializerMethodField()

    medicines = PrescriptionMedicineSerializer(
        many=True,
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

            "id",

            "doctor_name",
            "patient_name",

            "medicines",

            "created_at",
        ]


    def get_doctor_name(self, obj):

        return (
            obj.doctor.user.get_full_name()
            or obj.doctor.user.username
        )


    def get_patient_name(self, obj):

        return (
            obj.patient.user.get_full_name()
            or obj.patient.user.username
        )


# =========================================================
# BILL SERIALIZER
# =========================================================

class BillSerializer(
    serializers.ModelSerializer
):

    patient_name = serializers.SerializerMethodField()

    patient_username = serializers.CharField(
        source="patient.user.username",
        read_only=True
    )


    class Meta:

        model = Bill

        fields = [

            "id",

            "patient",

            "patient_name",

            "patient_username",

            "appointment",

            "amount",

            "status",

            "created_at",

            "paid_at",
        ]

        read_only_fields = [

            "id",

            "patient_name",
            "patient_username",

            "created_at",
        ]


    def get_patient_name(self, obj):

        return (
            obj.patient.user.get_full_name()
            or obj.patient.user.username
        )