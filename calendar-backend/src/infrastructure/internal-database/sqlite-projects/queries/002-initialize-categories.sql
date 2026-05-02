INSERT INTO categories (id, created_on, updated_on, name, description, color, objective_id)
VALUES
-- Life (1)
('7', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Dentist', 'Routine dental care appointments', '#58B57B', 1),
('8', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Physical Therapy', 'Rehabilitation and recovery sessions', '#7ACB9F', 1),
('9', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Budgeting', 'Personal financial planning and tracking', '#3FAF92', 1),
('10', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Allowance', 'Personal spending allocation tracking', '#91C76B', 1),

-- Work (2)
('1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Kickoffs', 'Project start alignment meetings', '#4E88C7', 2),
('2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '1:1 Meetings', 'Direct one-on-one discussions', '#6FCFE0', 2),
('3', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Demos', 'Work reviews and demonstrations', '#3FA7B5', 2),
('4', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Design Review', 'Reviewing system and UI designs', '#7B8EDB', 2),
('5', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Code Review', 'Reviewing and discussing code changes', '#5C6BC0', 2),
('6', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Deadline Check', 'Milestone and delivery tracking updates', '#6DA7D9', 2),

-- Play (3)
('11', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Practice', 'Skill development and repetition', '#D96A78', 3),
('12', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Games', 'Competitive or recreational gameplay', '#E18A5C', 3),
('14', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Kitchen Remodel', 'The big kitchen upgrade!', '#C97BC2', 3),
('15', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Bathroom Renovation', 'Getting a double-vanity sink!', '#E07B9A', 3);
