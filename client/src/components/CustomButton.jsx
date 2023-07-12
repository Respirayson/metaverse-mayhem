function CustomButton({
  type, title, customStyles, handleClick,
}) {
  const generateStyle = (type) => {
    switch (type) {
      case 'filled':
        return {
          backgroundColor: '#bdcbd8',
          color: '#000000',
        };
      case 'outline':
        return {
          borderWidth: '2px',
          borderColor: '#bdcbd8',
          color: '#000000',
        };
      default:
        return {};
    }
  };

  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
      style={generateStyle(type)}
      onClick={handleClick}
    >
      {title}
    </button>
  );
}

export default CustomButton;
