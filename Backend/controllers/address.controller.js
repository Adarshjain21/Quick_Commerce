import { json } from "express";
import AddressModel from "../models/address.model.js";
import UserModel from "../models/user.model.js";

export const addAddressController = async (req, res) => {
  try {
    const userId = req.userId;
    const { addressLine, city, state, pincode, country, mobile } = req.body;

    const createAddress = new AddressModel({
      addressLine,
      city,
      state,
      pincode,
      country,
      mobile,
      userId: userId,
    });

    const saveAddress = await createAddress.save();

    const addUserAddressId = await UserModel.findByIdAndUpdate(userId, {
      $push: {
        addressDetails: saveAddress._id,
      },
    });

    return res.json({
      message: "Address Created Successfully",
      error: false,
      success: true,
      data: saveAddress,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getAddressController = async (req, res) => {
  try {
    const userId = req.userId;

    const data = await AddressModel.find({ userId: userId }).sort({
      createdAt: -1,
    });

    return res.json({
      data: data,
      message: "List of address",
      error: false,
      success: true,
    });
  } catch (error) {
    return (
      res.status(500),
      json({
        message: error.message || error,
        error: true,
        success: false,
      })
    );
  }
};

export const updateAddressController = async (req, res) => {
  try {
    const userId = req.userId;
    const { _id, addressLine, city, state, country, pincode, mobile } = req.body;

    const updateAddress = await AddressModel.updateOne(
      { _id: _id, userId: userId },
      {
        addressLine,
        city,
        state,
        country,
        pincode,
        mobile,
      }
    );

    res.json({
      message: "Address update",
      error: false,
      success: true,
      data: updateAddress,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const deleteAddressController = async (req, res) => {
  try {
    const userId = req.userId
    const { _id } = req.body

    const disableAddress = await AddressModel.updateOne({ _id: _id, userId },{
      status: false
    })

    return res.json({
      message: "Address remove",
      error: false,
      success: true,
      data: disableAddress
    })
  } catch (error) {
    return req.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })
  }
}