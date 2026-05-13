import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type EditProfileButtonProps = {
  onPress: () => void;
};

export default function EditProfileButton({
  onPress,
}: EditProfileButtonProps) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>
        Editar Perfil
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 20,
    right: 20,

    backgroundColor: '#4A90E2',

    paddingVertical: 10,
    paddingHorizontal: 16,

    borderRadius: 10,

    elevation: 3,
  },

  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});