export default function QuizResultCorrectAnsShow() {
  return (
    <div className="max-h-screen md:w-1/2 flex items-center justify-center h-full p-8">
      <div className="h-[calc(100vh-50px)] overflow-y-scroll ">
        <div className="px-4">
          <div className="rounded-lg overflow-hidden shadow-sm mb-4">
            <div className="bg-white p-6 !pb-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  1. Which of the following is NOT a binary tree traversal
                  method?
                </h3>
              </div>
              <div className="space-y-2">
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="answer1"
                    className="form-radio text-buzzr-purple"
                    checked
                  />
                  <span>Inorder</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="answer1"
                    className="form-radio text-buzzr-purple"
                  />
                  <span>Preorder</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="answer1"
                    className="form-radio text-buzzr-purple"
                  />
                  <span>Postorder</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="answer1"
                    className="form-radio text-buzzr-purple"
                  />
                  <span>Crossorder</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}