import Reservation from '../models/Reservation.js';
import Room from '../models/Room.js';

// Check room availability
export const checkAvailability = async (req, res) => {
  try {
    const { roomId, checkIn, checkOut } = req.query;

    if (!roomId || !checkIn || !checkOut) {
      return res.status(400).json({
        success: false,
        message: 'roomId, checkIn y checkOut son requeridos',
      });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Find overlapping reservations
    const existingReservation = await Reservation.findOne({
      room: roomId,
      status: { $in: ['pending', 'confirmed'] },
      $or: [
        {
          checkIn: { $lt: checkOutDate },
          checkOut: { $gt: checkInDate },
        },
      ],
    });

    res.json({
      success: true,
      available: !existingReservation,
    });
  } catch (error) {
    console.error('Error checking availability:', error);
    res.status(500).json({
      success: false,
      message: 'Error al verificar disponibilidad',
    });
  }
};

// Get available rooms for date range
export const getAvailableRooms = async (req, res) => {
  try {
    const { checkIn, checkOut, guests } = req.query;

    if (!checkIn || !checkOut) {
      return res.status(400).json({
        success: false,
        message: 'checkIn y checkOut son requeridos',
      });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Get all rooms
    const allRooms = await Room.find({ available: true });

    // Find rooms with overlapping reservations
    const busyReservations = await Reservation.find({
      status: { $in: ['pending', 'confirmed'] },
      checkIn: { $lt: checkOutDate },
      checkOut: { $gt: checkInDate },
    }).select('room');

    const busyRoomIds = busyReservations.map((r) => r.room.toString());

    // Filter available rooms
    let availableRooms = allRooms.filter(
      (room) => !busyRoomIds.includes(room._id.toString())
    );

    // Filter by guest capacity if specified
    if (guests) {
      availableRooms = availableRooms.filter(
        (room) => room.capacity >= parseInt(guests, 10)
      );
    }

    res.json({
      success: true,
      data: availableRooms,
    });
  } catch (error) {
    console.error('Error getting available rooms:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener habitaciones disponibles',
    });
  }
};

// Create reservation
export const createReservation = async (req, res) => {
  try {
    const {
      roomId,
      checkIn,
      checkOut,
      guests,
      guestName,
      email,
      phone,
      specialRequests,
    } = req.body;

    // Get room to calculate price
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Habitación no encontrada',
      });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Calculate nights
    const nights = Math.ceil(
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
    );

    if (nights < 1) {
      return res.status(400).json({
        success: false,
        message: 'La estancia mínima es de 1 noche',
      });
    }

    // Check availability again
    const existingReservation = await Reservation.findOne({
      room: roomId,
      status: { $in: ['pending', 'confirmed'] },
      checkIn: { $lt: checkOutDate },
      checkOut: { $gt: checkInDate },
    });

    if (existingReservation) {
      return res.status(409).json({
        success: false,
        message: 'La habitación no está disponible para las fechas seleccionadas',
      });
    }

    // Calculate total price
    const totalPrice = room.price * nights;

    // Create reservation
    const reservation = await Reservation.create({
      room: roomId,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests,
      guestName,
      email,
      phone,
      specialRequests,
      totalPrice,
    });

    // Populate room data for response
    await reservation.populate('room', 'name type');

    res.status(201).json({
      success: true,
      message: 'Reservación creada exitosamente',
      data: {
        confirmationCode: reservation.confirmationCode,
        room: reservation.room.name,
        checkIn: reservation.checkIn,
        checkOut: reservation.checkOut,
        nights,
        totalPrice: reservation.totalPrice,
        guestName: reservation.guestName,
        email: reservation.email,
      },
    });
  } catch (error) {
    console.error('Error creating reservation:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al crear la reservación',
    });
  }
};

// Get reservation by confirmation code
export const getReservation = async (req, res) => {
  try {
    const { code } = req.params;

    const reservation = await Reservation.findOne({
      confirmationCode: code.toUpperCase(),
    }).populate('room', 'name type images');

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Reservación no encontrada',
      });
    }

    res.json({
      success: true,
      data: reservation,
    });
  } catch (error) {
    console.error('Error getting reservation:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener la reservación',
    });
  }
};

// Cancel reservation
export const cancelReservation = async (req, res) => {
  try {
    const { code } = req.params;
    const { email } = req.body;

    const reservation = await Reservation.findOne({
      confirmationCode: code.toUpperCase(),
      email: email.toLowerCase(),
    });

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Reservación no encontrada o email incorrecto',
      });
    }

    if (reservation.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'La reservación ya está cancelada',
      });
    }

    reservation.status = 'cancelled';
    await reservation.save();

    res.json({
      success: true,
      message: 'Reservación cancelada exitosamente',
    });
  } catch (error) {
    console.error('Error cancelling reservation:', error);
    res.status(500).json({
      success: false,
      message: 'Error al cancelar la reservación',
    });
  }
};
