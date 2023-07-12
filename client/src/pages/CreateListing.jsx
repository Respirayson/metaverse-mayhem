import { useState } from 'react';

import { motion } from 'framer-motion';
import { fadeAnimation } from '../utils/motion';
import { FormField, CustomButton } from '../components';

function CreateListing() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    seller: '',
    price: '',
    url: '',
    telegramHandle: '',
    category: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <motion.div
        key="custom"
        className="flex justify-center items-center w-2/3 h-full mx-auto"
        {...fadeAnimation}
      >
        <div className="bg-[#1c1c24] rounded-[10px] sm:p-10">
          <div className="flex flex-row justify-center items-center p-[16px] bg-[#3a3a43] rounded-[10px]">
            <h1 className="font-bold sm:text=[25px] text-[18px] leading-[38px] text-white">
              Start a Listing
            </h1>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full mt-[65px] flex flex-col gap-[30px]"
          >
            <div className="flex flex-wrap gap-[40px]">
              <FormField
                labelName="Name"
                placeholder="Enter name of item"
                inputType="text"
                value={form.name}
                handleChange={(e) => setForm({
                  ...form,
                  name: e.target.value,
                })}
              />
              <FormField
                labelName="Description"
                placeholder="Enter description of item"
                isTextArea
                value={form.description}
                handleChange={(e) => setForm({
                  ...form,
                  description: e.target.value,
                })}
              />
              <FormField
                labelName="Seller"
                placeholder="Enter your name"
                inputType="text"
                value={form.seller}
                handleChange={(e) => setForm({
                  ...form,
                  seller: e.target.value,
                })}
              />
              <FormField
                labelName="Price"
                placeholder="Enter price of item"
                inputType="number"
                value={form.price}
                handleChange={(e) => setForm({
                  ...form,
                  price: e.target.value,
                })}
              />
              <FormField
                labelName="Image URL"
                placeholder="Enter image URL"
                inputType="url"
                value={form.url}
                handleChange={(e) => setForm({
                  ...form,
                  url: e.target.value,
                })}
              />
              <FormField
                labelName="Telegram Handle"
                placeholder="Enter your Telegram handle"
                inputType="text"
                value={form.telegramHandle}
                handleChange={(e) => setForm({
                  ...form,
                  telegramHandle: e.target.value,
                })}
              />
            </div>
            <div className="flex justify-center items-center">
              <CustomButton
                type="filled"
                title="Submit new Listing"
                customStyles="w-fit px-4 py-4 font-bold text-l"
              />
            </div>
          </form>
        </div>
      </motion.div>
      <motion.div
        className="absolute z-20 top-5 right-5"
        {...fadeAnimation}
      />
    </>
  );
}

export default CreateListing;
