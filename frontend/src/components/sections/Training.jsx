import React, { useState } from 'react';
import TrainingCard from '../common/TrainingCard';
import EditButton from '../common/EditButton';
import PopupEditService from '../common/PopupEditService';
import useTrainingsAPI from '../../hooks/useTrainingsAPI';
import { FaEdit, FaTimes } from 'react-icons/fa';

const Training = ({ isLoggedIn = false }) => {
  const { trainings, trainingTitle, trainingSubtitle, isLoading, error, updateTraining, updateTrainingHeader } = useTrainingsAPI();

  const [editMode, setEditMode] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState(null);

  const [isHeaderEdit, setIsHeaderEdit] = useState(false);
  const [headerTitle, setHeaderTitle] = useState(trainingTitle);
  const [headerSubtitle, setHeaderSubtitle] = useState(trainingSubtitle);

  const onEditTraining = (idx) => {
    const t = trainings[idx];
    if (!t) return;
    setEditIndex(idx);
    setEditData(t);
    setIsEditOpen(true);
  };

  const handleAddNewTraining = () => {
    const newTraining = {
      name: 'Khóa học mới',
      target: 'Cá nhân',
      description: 'Mô tả khóa học mới',
      highlights: ['Nội dung 1', 'Nội dung 2'],
      duration: '1-2 giờ',
      zaloUrl: '',
      facebookUrl: ''
    };

    setEditData(newTraining);
    setEditIndex(-1); // -1 indicates new training
    setIsEditOpen(true);
  };

  const handleSaveFromPopup = async (payload) => {
    try {
      await updateTraining({
        index: payload.index,
        training: payload.service,
      });
      setIsEditOpen(false);
    } catch (e) {
      alert(e.message || 'Có lỗi khi cập nhật');
    }
  };

  const handleDeleteTraining = async (index) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa khóa học này?');
    
    if (!confirmDelete) return;

    try {
      await updateTraining({
        index: index,
        training: null, // null indicates deletion
        isDelete: true
      });
      alert('Xóa khóa học thành công!');
    } catch (e) {
      alert(e.message || 'Có lỗi khi xóa khóa học');
    }
  };

  const handleSaveHeader = async () => {
    try {
      await updateTrainingHeader(headerTitle, headerSubtitle);
      setIsHeaderEdit(false);
    } catch (e) {
      alert(e.message || 'Có lỗi khi cập nhật tiêu đề');
    }
  };

  if (isLoading) return <div className="text-center py-6">Đang tải khóa học...</div>;
  if (error) return <div className="text-center text-red-500 py-6">{error}</div>;
  if (!trainings?.length) return null;

  return (
    <section id="training" className="scroll-mt-24 mb-8 sm:mb-10 md:mb-12">
      <div className="relative">
        <div className="absolute inset-0 bg-white rounded-2xl shadow-md"></div>
        <div className="relative z-10 p-4 sm:p-6 md:p-8">
          
          {/* Edit Mode Toggle */}
          {isLoggedIn && (
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setEditMode(!editMode)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  editMode 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {editMode ? <FaTimes size={14} /> : <FaEdit size={14} />}
                {editMode ? 'Thoát chế độ chỉnh sửa' : 'Chế độ chỉnh sửa'}
              </button>
            </div>
          )}
          
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            {!isHeaderEdit ? (
              <>
                <h3 className="text-xl sm:text-5xl font-bold text-blue-600 mb-2 flex justify-center items-center gap-2">
                  {trainingTitle}
                  {/* Edit header button - only show in edit mode */}
                  {isLoggedIn && editMode && (
                    <EditButton
                      onClick={() => {
                        setHeaderTitle(trainingTitle);
                        setHeaderSubtitle(trainingSubtitle);
                        setIsHeaderEdit(true);
                      }}
                      className="text-xs px-2 py-1 text-blue-600 border border-blue-600 rounded"
                      isVisible={true}
                    />
                  )}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 px-2">{trainingSubtitle}</p>
              </>
            ) : (
              <div className="space-y-2 max-w-lg mx-auto">
                <input
                  className="border p-2 rounded w-full"
                  value={headerTitle}
                  onChange={(e) => setHeaderTitle(e.target.value)}
                />
                <input
                  className="border p-2 rounded w-full"
                  value={headerSubtitle}
                  onChange={(e) => setHeaderSubtitle(e.target.value)}
                />
                <div className="flex justify-center gap-2">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded" onClick={handleSaveHeader}>Lưu</button>
                  <button className="px-3 py-1 bg-gray-300 rounded" onClick={() => setIsHeaderEdit(false)}>Hủy</button>
                </div>
              </div>
            )}
          </div>

          {/* Cards */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-6xl w-full">
              {trainings.map((t, idx) => (
                <div key={`training-${idx}`} className="relative">
                  <TrainingCard
                    title={t.name}
                    category={t.target}
                    description={t.description}
                    highlights={t.highlights || []}
                    duration={t.duration}
                    zaloUrl={t.zaloUrl}
                    facebookUrl={t.facebookUrl}
                    hidePrice
                  />
                  {/* Edit button - only show in edit mode */}
                  {isLoggedIn && editMode && (
                    <div className="absolute top-2 right-2 z-20">
                      <EditButton
                        onClick={() => onEditTraining(idx)}
                        className="text-xs px-2 py-1 text-blue-600 border border-blue-600 rounded"
                        isVisible={true}
                      />
                    </div>
                  )}
                  {/* Delete button - only show in edit mode */}
                  {isLoggedIn && editMode && (
                    <div className="absolute top-2 left-2 z-20">
                      <button
                        onClick={() => handleDeleteTraining(idx)}
                        className="text-xs px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md"
                        title="Xóa khóa học"
                      >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Add New Training Button */}
              {isLoggedIn && editMode && (
                <div className="flex items-center justify-center">
                  <button
                    onClick={handleAddNewTraining}
                    className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-blue-400/50 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 transition-colors duration-200 text-blue-400 hover:text-blue-300"
                  >
                    <span className="text-3xl mb-2">+</span>
                    <span className="text-sm font-medium">Thêm khóa học mới</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <PopupEditService
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleSaveFromPopup}
        serviceData={editData}
        type="training"
        index={editIndex}
      />
    </section>
  );
};

export default Training;
