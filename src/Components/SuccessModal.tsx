import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modal';
import { Images } from '../Assets/Images/Images';
import { Colors } from '../Utils/Colors';
import { moderateScale, scale, verticalScale, widthPx } from '../Utils/Responsive';

interface SuccessModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isVisible,
  onClose,
  title = 'Login Successful!',
}) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.modalContent}>
        <Image style={styles.iconContainer} source={Images.checkCircle} />

        <Text style={styles.successText}>{title}</Text>
        <Pressable style={styles.doneButton} onPress={onClose}>
          <Text style={styles.doneButtonText}>Done</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    paddingHorizontal: scale(22),
    paddingVertical: verticalScale(22),
    borderRadius: moderateScale(20),
    alignItems: 'center',
    marginHorizontal: scale(20),
    width: widthPx(80),
    maxWidth: 400,
  },
  iconContainer: {
    marginBottom: verticalScale(20),
    width: scale(100),
    height: verticalScale(100),
    tintColor: Colors.primary,
  },
  icon: {
    fontSize: moderateScale(30),
    color: Colors.primary,
  },
  successText: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginBottom: verticalScale(20),
    textAlign: 'center',
  },
  doneButton: {
    backgroundColor: Colors.primary,
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(20),
    borderRadius: moderateScale(5),
    width: widthPx(60),
    maxWidth: 300,
    alignItems: 'center',
  },
  doneButtonText: {
    color: 'white',
    fontSize: moderateScale(16),
  },
});

export default SuccessModal;
