import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: [true, 'La habitación es requerida'],
    },
    checkIn: {
      type: Date,
      required: [true, 'La fecha de entrada es requerida'],
    },
    checkOut: {
      type: Date,
      required: [true, 'La fecha de salida es requerida'],
    },
    guests: {
      type: Number,
      required: [true, 'El número de huéspedes es requerido'],
      min: [1, 'Mínimo 1 huésped'],
      max: [6, 'Máximo 6 huéspedes'],
    },
    guestName: {
      type: String,
      required: [true, 'El nombre del huésped es requerido'],
      trim: true,
      maxlength: [100, 'El nombre no puede exceder 100 caracteres'],
    },
    email: {
      type: String,
      required: [true, 'El email es requerido'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Por favor ingrese un email válido'],
    },
    phone: {
      type: String,
      required: [true, 'El teléfono es requerido'],
      trim: true,
      match: [/^[\d\s\-+()]{8,20}$/, 'Por favor ingrese un teléfono válido'],
    },
    specialRequests: {
      type: String,
      trim: true,
      maxlength: [500, 'Las solicitudes especiales no pueden exceder 500 caracteres'],
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
    totalPrice: {
      type: Number,
      required: true,
      min: [0, 'El precio no puede ser negativo'],
    },
    confirmationCode: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// Generate confirmation code before saving
reservationSchema.pre('save', function (next) {
  if (!this.confirmationCode) {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    this.confirmationCode = `CDS-${timestamp}-${random}`;
  }
  next();
});

// Validate check-out is after check-in
reservationSchema.pre('save', function (next) {
  if (this.checkOut <= this.checkIn) {
    const error = new Error('La fecha de salida debe ser posterior a la de entrada');
    next(error);
  }
  next();
});

// Index for availability queries
reservationSchema.index({ room: 1, checkIn: 1, checkOut: 1 });
reservationSchema.index({ confirmationCode: 1 });
reservationSchema.index({ email: 1 });

export default mongoose.model('Reservation', reservationSchema);
