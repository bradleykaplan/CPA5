'''
schedule maintains a list of courses with features for operating on that list
by filtering, mapping, printing, etc.
'''

import json

class Schedule():
    '''
    Schedule represent a list of Brandeis classes with operations for filtering
    '''
    def __init__(self,courses=()):
        ''' courses is a tuple of the courses being offered '''
        self.courses = courses

    def load_courses(self):
        ''' load_courses reads the course data from the courses.json file'''
        print('getting archived regdata from file')
        with open("courses20-21.json","r",encoding='utf-8') as jsonfile:
            courses = json.load(jsonfile)
        for course in courses:
            course['instructor'] = tuple(course['instructor'])
            course['coinstructors'] = [tuple(f) for f in course['coinstructors']]
        self.courses = tuple(courses)  # making it a tuple means it is immutable

    def lastname(self,names):
        ''' lastname returns the courses by a particular instructor last name'''
        return Schedule([course for course in self.courses if course['instructor'][1] in names])

    def email(self,emails):
        ''' email returns the courses by a particular instructor email'''
        return Schedule([course for course in self.courses if course['instructor'][2] in emails])

    def term(self,terms):
        ''' email returns the courses in a list of term'''
        return Schedule([course for course in self.courses if course['term'] in terms])

    def enrolled(self,vals):
        ''' enrolled filters for enrollment numbers in the list of vals'''
        return Schedule([course for course in self.courses if course['enrolled'] in vals])

    def subject(self,subjects):
        ''' subject filters the courses by subject '''
        return Schedule([course for course in self.courses if course['subject'] in subjects])

    def sort(self,field):
        if field=='subject':
            return Schedule(sorted(self.courses, key= lambda course: course['subject']))
        else:
            print("can't sort by "+str(field)+" yet")
            return self

    def title(self, phrase):
        ''' filters courses by titles containing phrase '''
        return Schedule([course for course in self.courses if phrase in course['name']])

    def days(self, days):
        ''' CONNOR 6C - filters courses that have classes only on the given days '''
        day_set = set(days)
        def check_days(course):
            ''' returns False if course meets on any day that is not allowed '''
            checks = [set(time['days']).issubset(day_set) for time in course['times']]
            return len(checks) > 0 and all(checks)
        
        return Schedule([course for course in self.courses if check_days(course)])

    def description(self,phrase):
        '''MALAI 6b - Filters based on the description of the course'''
        return Schedule([course for course in self.courses if phrase in course['description']])

    def stillFree(self,subjects):
        ''' MALAI 6C - Finds out the courses that does not have students waiting to enroll in a particular subject'''
        return Schedule([course for course in self.courses if course['subject'] in subjects and ((course['waiting'])<=0)])

    def small(self, cap):
        ''' Bradley 6c - filters courses by course capacity, returning courses with open enrollment and a lower, or the same, capacity than/as cap '''
        return Schedule([course for course in self.courses if course['limit'] != None and course['limit'] > 0 and cap >= course['limit'] and course['status_text'] == 'Open'])
