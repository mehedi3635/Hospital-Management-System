from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):

    ROLE_CHOICES = [
        ("admin", "Admin"),
        ("doctor", "Doctor"),
        ("patient", "Patient"),
        ("receptionist", "Receptionist"),
    ]

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default="patient"
    )

    phone = models.CharField(
        max_length=20,
        blank=True
    )

    def __str__(self):
        return self.username


class Department(models.Model):

    name = models.CharField(max_length=100)

    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Doctor(models.Model):

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="doctor_profile"
    )

    department = models.ForeignKey(
        Department,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="doctors"
    )

    specialization = models.CharField(
        max_length=150
    )

    availability = models.BooleanField(
        default=True
    )

    phone = models.CharField(
        max_length=20,
        blank=True
    )

    def __str__(self):
        return self.user.get_full_name() or self.user.username


class Patient(models.Model):

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="patient_profile"
    )

    date_of_birth = models.DateField(
        null=True,
        blank=True
    )

    gender = models.CharField(
        max_length=20,
        blank=True
    )

    address = models.TextField(
        blank=True
    )

    phone = models.CharField(
        max_length=20,
        blank=True
    )

    def __str__(self):
        return self.user.get_full_name() or self.user.username


class Appointment(models.Model):

    STATUS_CHOICES = [
        ("scheduled", "Scheduled"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
    ]

    doctor = models.ForeignKey(
        Doctor,
        on_delete=models.CASCADE,
        related_name="appointments"
    )

    patient = models.ForeignKey(
        Patient,
        on_delete=models.CASCADE,
        related_name="appointments"
    )

    appointment_date = models.DateTimeField()

    reason = models.TextField(
        blank=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="scheduled"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return (
            f"{self.patient} - "
            f"{self.doctor} - "
            f"{self.appointment_date}"
        )


class Medicine(models.Model):

    name = models.CharField(
        max_length=150
    )

    description = models.TextField(
        blank=True
    )

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    stock = models.PositiveIntegerField(
        default=0
    )

    def __str__(self):
        return self.name


class Prescription(models.Model):

    doctor = models.ForeignKey(
        Doctor,
        on_delete=models.CASCADE,
        related_name="prescriptions"
    )

    patient = models.ForeignKey(
        Patient,
        on_delete=models.CASCADE,
        related_name="prescriptions"
    )

    appointment = models.ForeignKey(
        Appointment,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    notes = models.TextField(
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"Prescription #{self.id}"


class PrescriptionMedicine(models.Model):

    prescription = models.ForeignKey(
        Prescription,
        on_delete=models.CASCADE,
        related_name="medicines"
    )

    medicine = models.ForeignKey(
        Medicine,
        on_delete=models.CASCADE
    )

    dosage = models.CharField(
        max_length=100
    )

    duration = models.CharField(
        max_length=100
    )

    instructions = models.TextField(
        blank=True
    )

    def __str__(self):
        return self.medicine.name


class Bill(models.Model):

    STATUS_CHOICES = [
        ("unpaid", "Unpaid"),
        ("paid", "Paid"),
    ]

    patient = models.ForeignKey(
        Patient,
        on_delete=models.CASCADE,
        related_name="bills"
    )

    appointment = models.ForeignKey(
        Appointment,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default="unpaid"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    paid_at = models.DateTimeField(
        null=True,
        blank=True
    )

    def __str__(self):
        return f"Bill #{self.id}"